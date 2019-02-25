import {Pipe, PipeTransform } from '@angular/core';

@Pipe(
    {name: 'upDown'}
)
 
export class UpDownPipe implements PipeTransform {

    transform(title: string, love: number): string{
        if(love > 0){
            return title+" - Up :)";
        }else if(love < 0){
            return title+" - Down :/";
        }else{
            return title;
        }
    }

}