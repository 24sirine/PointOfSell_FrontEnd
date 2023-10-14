
import { ArticleService } from '../article.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-tab-header-article',
  templateUrl: './tab-header-article.component.html',
  styleUrls: ['./tab-header-article.component.css']
})

export class TabHeaderArticleComponent {
  stockinsuffisant: boolean = false;
  constructor(private articleService:ArticleService){ 
  }
  codeInputs: string[] = []; // Tableau pour stocker les saisies du champ code
  qteInputs: string[] = []; // Tableau pour stocker les saisies du champ QteArticle
  input:string = '';
  result:string = '';
  result2:string='';
  QteArticle :string='';
  codeArticle:String='';
  libelleArticle:String='';
  stockArticle: any ;
  urlArticle:String='';

  isQuantityInputFocused: boolean = false;
  isCodeInputFocused: boolean = true;

  goToQuantityInput() {
    const quantiteInputElement: HTMLInputElement = document.getElementsByName('QteArticle')[0] as HTMLInputElement;
    quantiteInputElement.focus();
    this.isCodeInputFocused= false;
    this.isQuantityInputFocused = true;
    this.QteArticle = '';
  }
 
  goToCodeInput() {
    const CodeInputElement: HTMLInputElement = document.getElementsByName('NomArticle')[0] as HTMLInputElement;
    CodeInputElement.focus();
    this.isQuantityInputFocused = false;
    this.isCodeInputFocused = true;
    this.input = '';

    
  }
 
  updateInputValue() {
    
   if (this.result2 < this.stockArticle)
   { this.articleService.setCodeArticle(this.result);
    this.articleService.setqteArticle(this.result2);
     // Stocke la valeur actuelle de l'input QteArticle dans le tableau qteInputs
     this.qteInputs.push(this.result);

     // Stocke la valeur actuelle de l'input code dans le tableau codeInputs
     this.codeInputs.push(this.result2);
     
     this.goToCodeInput();
     // Réinitialise la valeur de l'input QteArticle et code
    this.result='';
    this.result2='';  
  this.stockArticle='';
  this.libelleArticle='';
  this.urlArticle='';
 const quantiteInputElement: HTMLInputElement = document.getElementsByName('QteArticle')[0] as HTMLInputElement;
     quantiteInputElement.value='';}
     else{this.stockinsuffisant = true;
   
      console.log("stock insuffisant");}
 
  }
  

  pressNum(num: string) {
    if (this.isQuantityInputFocused ) {

      if (num === '.') {
        if (this.QteArticle !== '') {
          const lastNum = this.getLastOperand();
          console.log(lastNum.lastIndexOf('.'));
          if (lastNum.lastIndexOf('.') >= 0) return;
        }
      }
  
      // Do Not Allow 0 at beginning.
      // Javascript will throw Octal literals are not allowed in strict mode.
      if (num === '0') {
        if (this.QteArticle === '') {
          return;
        }
        const prevKey = this.QteArticle[this.QteArticle.length - 1];
        if (prevKey === '/' || prevKey === '*' || prevKey === '-' || prevKey === '+') {
          return;
        }
      }
  
      this.QteArticle = this.QteArticle + num;
  
      this.calcAnswer();
    } else if (this.isCodeInputFocused )
    
    
    
    {
      // Do Not Allow . more than once
      if (num === '.') {
        if (this.input !== '') {
          const lastNum = this.getLastOperand();
          console.log(lastNum.lastIndexOf('.'));
          if (lastNum.lastIndexOf('.') >= 0) return;
        }
      }
  
      // Do Not Allow 0 at beginning.
      // Javascript will throw Octal literals are not allowed in strict mode.
      if (num === '0') {
        if (this.input === '') {
          return;
        }
        const prevKey = this.input[this.input.length - 1];
        if (prevKey === '/' || prevKey === '*' || prevKey === '-' || prevKey === '+') {
          return;
        }
      }
  
      this.input = this.input + num;
  
      this.calcAnswer();
      this.updateArticleDetails();
    }
   
  }
  
 
 
  getLastOperand() {
    if (this.isQuantityInputFocused){ let pos1:number;

      pos1=this.QteArticle.toString().lastIndexOf("+")
      if (this.QteArticle.toString().lastIndexOf("-") > pos1) pos1=this.QteArticle.lastIndexOf("-")
      if (this.QteArticle.toString().lastIndexOf("*") > pos1) pos1=this.QteArticle.lastIndexOf("*")
      if (this.QteArticle.toString().lastIndexOf("/") > pos1) pos1=this.QteArticle.lastIndexOf("/")
      console.log('Last '+this.QteArticle.substr(pos1+1))
      return this.input.substr(pos1+1)}
    else{
    let pos:number;

    pos=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    console.log('Last '+this.input.substr(pos+1))
    return this.input.substr(pos+1)}
  }
 
 
  pressOperator(op: string) {
    if (this.isQuantityInputFocused) {
      const lastKey1 = this.QteArticle[this.QteArticle.length - 1];
      if (lastKey1 === '/' || lastKey1 === '*' || lastKey1 === '-' || lastKey1 === '+') {
        return;
      }
  
      this.QteArticle= this.QteArticle + op;
  
      this.calcAnswer();
    } else {
      // Do not allow operators more than once
      const lastKey = this.input[this.input.length - 1];
      if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
        return;
      }
  
      this.input = this.input + op;
  
      this.calcAnswer();
    }
  }
  
 
 
  
 
  allClear() {
    if (this.isQuantityInputFocused) {
      const quantiteInputElement: HTMLInputElement = document.getElementsByName(
        'QteArticle'
      )[0] as HTMLInputElement;
      quantiteInputElement.value ='';}
      else{
    this.result = '';
    this.input = '';}
  }
 
  calcAnswer() {
    if (this.isQuantityInputFocused){ let formula1 = this.QteArticle;
 
      let lastKey1 = formula1[formula1.length - 1];
   
      if (lastKey1 === '.')  {
        formula1=formula1.substr(0,formula1.length - 1);
      }
   
      lastKey1 = formula1[formula1.length - 1];
   
      if (lastKey1 === '/' || lastKey1 === '*' || lastKey1 === '-' || lastKey1 === '+' || lastKey1 === '.')  {
        formula1=formula1.substr(0,formula1.length - 1);
      }
   
      console.log("Formula " +formula1);
      this.result2 = eval(formula1);}
    else{
    let formula = this.input;
 
    let lastKey = formula[formula.length - 1];
 
    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    lastKey = formula[formula.length - 1];
 
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    console.log("Formula " +formula);
    this.result = eval(formula);

  }}

 








  updateArticleDetails() {

    const code = this.result;
    this.articleService.getLibelleArticle(code).subscribe((resp : string) => {
        this.libelleArticle = resp.toString();
        console.log(resp);
  
      
      },
      (err) => {
        console.log(err);
      }
    );
 
    this.articleService.getStockArticle(code).subscribe((resp) => {
      this.stockArticle = resp;
      console.log(resp);
    },
    (err)=>{
      console.log('error stock');
     
    });


 this.articleService.getUrlImgArticle(code).subscribe((resp : string)=>{
this.urlArticle =resp;
console.log(resp);
    },
    (err)=>
    {
      console.log(err);
    });
  }
}




