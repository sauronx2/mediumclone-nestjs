import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import slugify from 'slugify';
import { ArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>) {}

  async createArticle(currentUser: UserEntity, articleDto: ArticleDto): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, articleDto);

    if (!article.tagList) article.tagList = [];

    article.slug = this.getSlug(articleDto.title);

    article.author = currentUser;

    return await this.articleRepository.save(article);
  }

  async deleteArticle(slug: string, currentUserId: number): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);

    if (!article) throw new HttpException('Article does not found', HttpStatus.NOT_FOUND);

    if (article.author.id !== currentUserId) {
      throw new HttpException('Only author can delete this article', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(slug: string, currentUserId: number, updateArticleDto: ArticleDto): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);

    if (!article) throw new HttpException('Article does not found', HttpStatus.NOT_FOUND);

    if (article.author.id !== currentUserId) {
      throw new HttpException('Only author can update this article', HttpStatus.FORBIDDEN);
    }

    Object.assign(article, updateArticleDto);

    article.slug = this.getSlug(updateArticleDto.title);

    return await this.articleRepository.save(article);
  }

  async findBySlug(slug: string) {
    return await this.articleRepository.findOne({ where: { slug: slug } });
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article };
  }

  private getSlug(title: string): string {
    return slugify(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }
}
