export default class PostService {
  constructor(postRepo, env, userRepo) {
    this._repo = postRepo;
    this._env = env;
    this._userRepo = userRepo;
  }

  async createPost(post) {
    try {
      const user = await this._userRepo.getUserById(post.userId);
      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }
      const postData = await this._repo.createPost(post);
      return {
        success: true,
        data: postData,
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async likePost(postId, userId, currentUser) {
    try {
      const user = await this._userRepo.getUserById(userId);

      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }
      const post = await this._repo.getPostById(postId);
      if (!post) {
        return {
          success: false,
          error: "Post not found",
        };
      }

      const postAuthor = await this._userRepo.getUserById(post.userId);
      // check if user has already liked
      let likeExists;
      if (post.likes.length > 0) {
        likeExists = post.likes.some((like) => {
          if (user.username === currentUser && like.username === "you") {
            return true;
          } else {
            return like.username === user.username;
          }
        });
      }

      if (likeExists && post.likes.length > 0) {
        post.likes = post.likes.filter(
          (like) => like.username !== user.username && like.username !== "you"
        );
        const resp = await this._repo.updatePostById(postId, {
          likes: post.likes,
        });
        postAuthor.notifications.push({description: "Someone liked your post"});
        await this._userRepo.updateUserById(post.userId, {
          notifications: postAuthor.notifications,
        });
        return {
          success: true,
          data: resp,
        };
      }

      if (user.username === currentUser) {
        post.likes.push({ username: "you" });
      } else {
        post.likes.push({ username: user.username });
      }

      const resp = await this._repo.updatePostById(postId, {
        likes: post.likes,
      });
      postAuthor.notifications.push({description: "Someone liked your post"});
      await this._userRepo.updateUserById(post.userId, {
        notifications: postAuthor.notifications,
      });

      return {
        success: true,
        data: resp,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async commentPost(postId, userId, comment) {
    try {
      const user = await this._userRepo.getUserById(userId);
      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }
      const post = await this._repo.getPostById(postId);
      if (!post) {
        return {
          success: false,
          error: "Post not found",
        };
      }
      const postAuthor = await this._userRepo.getUserById(post.userId);

      if (comment) {
        post.comments.push({ comment: comment, author: user.username });
        const resp = await this._repo.updatePostById(post.id, {
          comments: post.comments,
        });
        postAuthor.notifications.push({description: "Someone commented on your post"});
        await this._userRepo.updateUserById(post.userId, {
          notifications: postAuthor.notifications,
        });
        return {
          success: true,
          data: resp,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async viewNumberOfLikes(postId) {
    try {
      const post = await this._repo.getPostById(postId);
      if (!post) {
        return {
          success: false,
          error: "Post not found",
        };
      }
      const numberOfLikes = post.likes.length;
      return {
        success: true,
        data: numberOfLikes,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async viewComments(postId, page = 1, limit = 10) {
    try {
      const post = await this._repo.getPostById(postId);
      if (!post) {
        return {
          success: false,
          error: "Post not found",
        };
      }
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
      };
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};

      if (endIndex < post.comments.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      results.results = post.comments.slice(startIndex, endIndex);

      return {
        success: true,
        data: results,
      };
      
    } catch (error) {
        return {
            success: false,
            error: error.message,
          };
    }
  }
}
