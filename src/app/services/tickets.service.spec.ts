import { TestBed } from "@angular/core/testing";

import { TicketsService } from "./tickets.service";
import { BackendService } from "../backend.service";

describe("TicketsService", () => {
  let service: TicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService],
    });
    service = TestBed.inject(TicketsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
