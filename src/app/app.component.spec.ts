import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { provideMockStore } from "@ngrx/store/testing";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [provideMockStore({})],
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Ticket'`, () => {
    expect(app.title).toEqual("Ticket");
  });

  it("should render title in a h2 tag", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h2").textContent).toContain("Ticket");
  });
});
