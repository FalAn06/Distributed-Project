# Reviews/models/review_model.py

from datetime import datetime

class Review:
    def __init__(self, productId, user, review, rating):
        self.productId = productId
        self.user = user
        self.review = review
        self.rating = rating
        self.timestamp = datetime.now()

    def to_dict(self):
        return {
            "productId": self.productId,
            "user": self.user,
            "review": self.review,
            "rating": self.rating,
            "timestamp": self.timestamp,
        }
