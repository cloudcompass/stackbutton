import { Injectable } from '@angular/core';
import { DataSourceModel } from '../_models/dataSourceModel';
import { Observable } from 'rxjs/Observable';
import {observable} from 'rxjs/symbol/observable';
import {isSuccess} from '@angular/http/src/http_utils';



@Injectable()
export class DataSourceService {

  private datasourceKey: string;

  constructor() {
    this.datasourceKey = 'stackDataSources';
  }

  /**
   * Retrieve all stored dataSources
   * TODO: Only fetches locally, get from database
   *
   * @returns {any}
   */
  getDataSources(): Observable<any> {
    const storedDataSources = JSON.parse(localStorage.getItem('stackDataSources'));
    if (storedDataSources) return Observable.of(storedDataSources);
    else return Observable.throw('No Stored DataSources Found!');
  }

  /**
   * Retrieve a dataSource by ID
   * TODO: Only fetches locally, get from database
   *
   * @param sourceID
   * @returns {any}
   */
  getDataSourceByID(sourceID: string): Observable<any> {
    if (!sourceID || sourceID === '') return Observable.throw('Invalid sourceID supplied');

    const storedDataSources = JSON.parse(localStorage.getItem('stackDataSources'));

    // If nothing was found, create a new array. Otherwise, check to see if this project is already added
    if (storedDataSources) {
      for (const ds of storedDataSources) {
        if (JSON.parse(ds).sourceID === sourceID) {
          return Observable.of(ds);
        }
      }
    }
    else return Observable.throw('No Datasources Stored');

    return Observable.throw('No DataSources Found');
  }

  /**
   * Remove a dataSource by ID
   * TODO: Only removes locally, remove from database
   * TODO: Lee you should double check to be sure this meets your backend specs. -C
   * @param sourceID
   * @returns {any}
   */
  removeDataSourceByID(sourceID: string): Observable<any> {
    if (!sourceID || sourceID === '') return Observable.throw('Invalid sourceID supplied');

    const storedDataSources = JSON.parse(localStorage.getItem('stackDataSources'));
    const updatedDataSources = [];
    for (const ds of storedDataSources){
      if (JSON.parse(ds).sourceID !== sourceID) {
        updatedDataSources.push(ds);
      }
    }
    // This must be eradicated so elements that check for the existence like the empty-component hide or show proper.
    if (updatedDataSources.length < 1){
      this.removeAllDataSources();
    }
    else {
      localStorage.setItem('stackDataSources', JSON.stringify(updatedDataSources));
    }
    return Observable.of('success');
  }

  /**
   * Removes all dataSources
   * TODO: Only removes locally, remove from database
   */
  removeAllDataSources() {
    localStorage.removeItem('stackDataSources');
  }

  /**
   * Add the dataSource if it doesn't already exist.
   * TODO: Only stores locally, store in database
   *
   * @param dataSource
   * @returns {any}
   */
  addDataSource(dataSource: DataSourceModel): Observable<any> {
    if (!dataSource) return Observable.throw('Invalid dataSource supplied');

    // Get the local storage dataSources, and add the new dataSource to it
    let storedDataSources = JSON.parse(localStorage.getItem('stackDataSources'));

    // If nothing was found, create a new array. Otherwise, check to see if this project is already added
    if (!storedDataSources) storedDataSources = [];
    else {
      for (const ds of storedDataSources) {
        if (JSON.parse(ds).sourceID === dataSource.sourceID) {
          console.log('Duplicate source found: ' + dataSource.sourceID);
          return Observable.throw('Duplicate DataSource Found');
        }
      }
    }

    // Store the dataSource locally TODO: Store to database
    storedDataSources.push(JSON.stringify(dataSource));
    localStorage.setItem('stackDataSources', JSON.stringify(storedDataSources));
    return Observable.of('Success');
  }
}
