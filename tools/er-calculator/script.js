new Vue({
  el: "#app",
  data() {
    return {
      info: null,
      user: "",
      followers: 0,
      following: 0,
      name: "",
      profilePic: "",
      posts: null,
      totalEngagements: 0,
      engagementRate: 0.00,
    };
  },
  methods: {
    updateData: function () {
      axios
        .get("https://www.instagram.com/" + this.user + "/?__a=1")
        .then((response) => {
          this.info = response;
          this.followers = response.data.graphql.user.edge_followed_by.count;
          this.following = response.data.graphql.user.edge_follow.count;
          this.name = response.data.graphql.user.full_name;
          this.profilePic = response.data.graphql.user.profile_pic_url_hd;
          this.posts =
            response.data.graphql.user.edge_owner_to_timeline_media.edges;
          this.calculateEngagements();
        });
    },
    calculateEngagements: function () {
      this.totalEngagements = 0;
      for (post in this.posts) {
        this.totalEngagements +=
          this.posts[post].node.edge_liked_by.count +
          this.posts[post].node.edge_media_to_comment.count;
      }
      this.engagementRate = (((this.totalEngagements / 12) / this.followers) * 100).toFixed(2) + '%';
    }
  },
  filters: {}
});
