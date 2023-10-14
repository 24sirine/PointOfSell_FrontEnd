import { Component } from '@angular/core';
import { ArticleService } from 'src/app/article.service';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.css']
})
export class ViewArticlesComponent {

  articlesDetails : any;
  constructor(private articleService:ArticleService){ 
  }
  ngOnInit() {
    this.getArticleDetails();
  
  }

  getArticleDetails()
  {
    this.articleService.getArticles().subscribe(
      (resp)=>{
        console.log('response');
        this.articlesDetails = resp ;
      },
      (err)=>{
        console.log('error');
      }
    );
  }
}
