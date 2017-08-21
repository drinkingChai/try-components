// component ideas
// forum thread
// simple up/down vote
// text box

// draw all comments
const drawAllComments = function(config) {
  let template = `
    <div class="comment-box">
      <div class="all-comments"></div>
    </div>
  `;

  let $html = $(template);
  let $allComments = $html.find('.all-comments');

  config.comments.forEach(comment=> {
    drawComment({
      parent: $allComments,
      content: comment
    })
  })

  drawNewComment({
    parent: $html,
    appendTo: $allComments
  })

  $(config.parent).append($html);
}

// draw one comment
const drawComment = function(config) {
  let template = `
    <div class="comment-cont">
      <p class="comment">${config.content.text}</p>
      <a class="reply" href="">Reply</a>
      <div class="rate"></div>
      <div class="replies"></div>
    </div>
  `;

  let $html = $(template);

  $html.on('click', '.reply', function(e) {
    e.preventDefault();
    if ($html.find('.new-comment').length) return;
    drawNewComment({
      parent: $html,
      appendTo: $html.find('.replies')
    })
  })

  drawVoteBox({
    parent: $html.find('.rate'),
    content: config.content.votes
  })

  $(config.parent).append($html);
}

// draw new comment area
const drawNewComment = function(config) {
  let template = `
    <div class="new-comment">
      <textarea></textarea>
      <a href="">Submit</a>
    </div>
  `;

  let $html = $(template);

  $html.on('click', 'a', function(e) {
    e.preventDefault();
    let $textarea = $html.find('textarea'),
      text = $textarea.val().trim();
    if (text.length) {
      drawComment({
        parent: config.appendTo,
        content: {
          text,
          votes: 0
        }
      })
      $textarea.val('');
    }
  })

  $(config.parent).append($html);
}

// draw up/down vote box
const drawVoteBox = function(config) {
  let template = `
    <div class="vote-box">
      <a class="up" href=""><i class="im im-arrow-up-circle"></i></a>
      <span>${config.content}</span>
      <a class="down" href=""><i class="im im-arrow-down-circle"></i></a>
    </div>
  `;

  let $html = $(template);

  $html.on('click', '.up', function(e) {
    e.preventDefault();
    let votesTag = $html.find('span'),
      votes = votesTag.html()*1
    votes++;
    votesTag.text(votes);
  })

  $html.on('click', '.down', function(e) {
    e.preventDefault();
    let votesTag = $html.find('span'),
      votes = votesTag.html()*1
    votes--;
    votesTag.text(votes);
  })

  $(config.parent).append($html);
}



drawAllComments({
  parent: '.thread',
  comments: [
    {
      text: 'Lorem ipsum set dolor amet',
      votes: 10
    },
    {
      text: 'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
      votes: 2
    }
  ]
})
