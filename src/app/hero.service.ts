import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IHero } from './types/hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService: MessageService, public http: HttpClient) { }

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<IHero[]>('getHeroes', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<IHero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<IHero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<IHero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    );
  }

  searchHero(term: string): Observable<IHero[]> {
    if (!term.trim()){
      return of([]);
    }
    return this.http.get<IHero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((result) => result.length ? this.log(`found heroes matching "${term}"`) :
      this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<IHero[]>('searchHeroes', []))
    )
  }
}
