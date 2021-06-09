import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Button } from "selenium-webdriver";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { HeroComponent } from "../hero/hero.component";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { doesNotThrow } from "assert";
import { tick, flush, async } from "@angular/core/testing";

describe("HeroDetailComponent", () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return "3";
          },
        },
      },
    };
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "SuperDude", strength: 100 })
    );
  });

  it("should render hero name in an h2 tag", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h2").innerText).toContain(
      "SUPERDUDE"
    );
  });

  it("should call updateHero when save is called", fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    flush();
    //tick(250);

    expect(mockHeroService.updateHero).toHaveBeenCalled();

    // setTimeout(() => {
    //   expect(mockHeroService.updateHero).toHaveBeenCalled();
    //   done();
    // }, 300);
  }));

  // it("should call updateHero when save is called", async(() => {
  //   mockHeroService.updateHero.and.returnValue(of({}));
  //   fixture.detectChanges();

  //   fixture.componentInstance.save();
  //   fixture.whenStable().then(() => {
  //     expect(mockHeroService.updateHero).toHaveBeenCalled();
  //   });
  // }));
});
