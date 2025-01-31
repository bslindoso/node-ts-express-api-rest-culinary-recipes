import { RatingModel } from "../models/rating-model";

export const isRatingModel = (obj: any): obj is RatingModel => {
  return !!obj.userId && typeof obj.userId === 'number'
    && !!obj.rating && typeof obj.rating === 'number'
}

export const ratingModelProperties = ['userId', 'rating', 'comment']