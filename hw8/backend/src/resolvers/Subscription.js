const Subscription = {
<<<<<<< HEAD
    message: {
        subscribe: (parent, { from, to }, { pubsub }) => {
            const chatBoxName = makeName(from, to);
            return pubsub.subscribe(`chatBox ${chatBoxName}`);
        },
=======
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(
        (post) => post.id === postId && post.published,
      );

      if (!post) {
        throw new Error('Post not found');
      }

      return pubsub.subscribe(`comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.subscribe('post');
>>>>>>> 918571b6dc031f721c84cf67257a094c4a7f7316
    },
}

export default Subscription