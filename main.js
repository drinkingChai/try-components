// draw unordered list
const drawUl = function(config) {
  var template = `
    <ul></ul>
  `;

  var $html = $(template);
  if (config.fn) config.fn($html);
  $(config.parent).append($html);

  return $html;
}

// draw list item
const drawLi = function(config) {
  var template = `
    <li>
      <p>${config.content}</p>
    </li>
  `;

  var $html = $(template);
  if (config.fns && config.fns.length) {
    config.fns.forEach(function(fn) {
      fn($html);
    })
  }

  $(config.parent).append($html);
}

// draw a button
const makeBtn = function(config) {
  /*
    config template:
    name: button name,
    fn: function,
  */
  var template = `
    <a class="btn" href="">${config.name}</a>
  `;
  var $html = $(template);
  $html.on('click', function(e) {
    e.preventDefault();
    if (config.fn) {
      config.fn();
    }
  })

  return $html;
}


const makeDelBtn = function(el) {
  el.append(makeBtn({
    name: 'delete',
    fn: function() {
      el.remove();
    }
  }))
}

const makeUpBtn = function(el) {
  el.append(makeBtn({
    name: 'up',
    fn: function() {
      el.insertBefore(el.prev())
    }
  }))
}

const makeDownBtn = function(el) {
  el.append(makeBtn({
    name: 'down',
    fn: function() {
      el.insertAfter(el.next())
    }
  }))
}

var list1 = drawUl({
  parent: 'main',
  fn: function(el) {
    var code = `<pre><code></code></pre>`;
    var $html = $(code);

    el.append(makeBtn({
      name: 'show inner html',
      fn: function() {
        $html.empty();
        $html.text(`${el.html()}`)
      }
    }))

    el.append($html);
  }
})

var buttons = [makeUpBtn, makeDownBtn, makeDelBtn]
var users = ['Phil', 'Mary', 'Joe', 'Vince', 'Adam']

users.forEach(i=> {
  drawLi({
    parent: list1,
    content: i,
    fns: buttons
  })
})




// config template
// {
//   parent: parent id
//   content: ,
//   fn: later
// }
