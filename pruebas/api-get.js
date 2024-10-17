import { check } from "k6";
import http from "k6/http";

export default function () {
  const response = http.get("http://localhost:6998/embalses/agua?id=32");

  check(response, {
    "response code was 200": (res) => res.status == 200,
  });
}

export const options = {
  stages: [
    { duration: "2m", target: 1000 },
    { duration: "2m", target: 1000 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_failed: [
      {
        threshold: "rate<=0.01",
        abortOnFail: true,
      },
    ],
    http_req_duration: ["p(95)<=500", "p(99)<=1000"],
    checks: ["rate>0.95"],
  },
};
