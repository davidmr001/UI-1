import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeployWidgetComponent } from './deploy-widget.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DeployService} from '../deploy.service';
import {DashboardService} from '../../../shared/dashboard.service';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IDeploy, IServers, IUnits} from '../interfaces';

class MockDeployService {
  mockDeployData = {
    result: [
      {
        name : 'QA',
        url : 'mydeployurl.com/something/something',
        units : [
          {
            name : 'api.jar',
            version : '2.0.5',
            jobURL: 'mydeployurl.com/something/something',
            deployed : true,
            lastUpdated : 1529001705028,
            servers : [
              {
                name : 'msp_tetris_dws_04',
                online : false,
              }
            ],
          }
        ],
        lastUpdated : 1560280286912
      }
    ]
  };

  // tslint:disable-next-line:max-line-length
  fetchDetails(): Observable<{ lastUpdated: number; name: string; units: { lastUpdated: number; servers: { name: string; online: boolean }[]; name: string; jobURL: string; deployed: boolean; version: string }[]; url: string }[]> {
    return of(this.mockDeployData.result);
  }
}

@NgModule({
  declarations: [],
  imports: [HttpClientTestingModule, SharedModule, CommonModule, BrowserAnimationsModule, RouterModule.forRoot([]), NgbModule],
  entryComponents: []
})
class TestModule { }

describe('DeployWidgetComponent', () => {
  let component: DeployWidgetComponent;
  let deployService: DeployService;
  let dashboardService: DashboardService;
  let modalService: NgbModule;
  let fixture: ComponentFixture<DeployWidgetComponent>;

  const IDeploy1 = {
    name: 'Test',
    url: 'testUrl.com',
    units: [
      {
        name: 'unitName',
        version: 'unitVersion',
        jobUrl: 'unitJobUrl',
        deployed: true,
        lastUpdated: 1232,
        servers: [
          {
            name: 'serverName',
            online: true
          } as IServers,
        ],
      } as IUnits,
    ],
  } as IDeploy;

  const IDeploy2 = {
    name: 'Test2',
    url: 'testUrl2.com',
    units: [
      {
        name: 'unitName2',
        version: 'unitVersion2',
        jobUrl: 'unitJobUrl2',
        deployed: true,
        lastUpdated: 1232,
        servers: [
          {
            name: 'serverName2',
            online: true
          } as IServers,
        ],
      } as IUnits,
    ],
  } as IDeploy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: DeployService, useClass: MockDeployService}
      ],
      imports: [TestModule, HttpClientTestingModule, SharedModule, CommonModule, BrowserAnimationsModule, RouterModule.forRoot([])],
      declarations: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeployWidgetComponent);
    component = fixture.componentInstance;
    deployService = TestBed.get(DeployService);
    dashboardService = TestBed.get(DashboardService);
    modalService = TestBed.get(NgbModal);
  }));

  it('should hit stopRefreshInterval', () => {
    component.stopRefreshInterval();
  });

  it('should makes use of result inside loadCharts', () => {
    component.loadCharts([IDeploy1, IDeploy2]);
  });

  it('should hit generateLatestDeployData and startRefreshInterval', () => {
    component.generateLatestDeployData([IDeploy1, IDeploy2]);
    component.startRefreshInterval();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(deployService).toBeTruthy();
    expect(dashboardService).toBeTruthy();
    expect(modalService).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
