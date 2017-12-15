suite('Custom Automation Tests for px-calendar', function() {
  let cal1, cal2, cal3, now;

  setup(function(done) {
    cal1 = fixture('calendar1');
    cal2 = fixture('calendar2');
    cal3 = fixture('calendar3');
    now = Px.moment();
    flush(()=>{
      done();
    });
  });

  test('by default calendar uses current month', function(){
    assert.isTrue(cal1.baseDate.isSame(now, 'month'));
  });

  test('Cell font size is 15px', function(){
    var pc = Polymer.dom(cal1.root).querySelector('px-calendar-cell'),
        textSize = window.getComputedStyle(Polymer.dom(pc.root).querySelector('button')).fontSize;
    assert.equal(textSize, '15px', 'Text size of cell should be 15px');
  });

  test('previous/next buttons', function(){

    var cal1Buttons = Polymer.dom(cal1.root).querySelectorAll('px-icon'),
        cal2Buttons = Polymer.dom(cal2.root).querySelectorAll('px-icon'),
        cal3Buttons = Polymer.dom(cal3.root).querySelectorAll('px-icon');

    assert.isTrue(cal1Buttons.length === 2);
    assert.isTrue(cal2Buttons.length === 1);
    assert.isTrue(cal3Buttons.length === 1);
    assert.equal(cal2Buttons[0].icon, 'px-nav:next');
    assert.equal(cal3Buttons[0].icon, 'px-nav:back');
  });
});

suite('test different displayModes', function() {
  let cal1, cal2, cal3, now;

  setup(function(done) {
    cal1 = fixture('calendar1');
    cal2 = fixture('calendar2');
    cal3 = fixture('calendar3');
    now = Px.moment();
    flush(()=>{
      done();
    });
  });

  test('cal1 prevent future dates', function(done){

    //get next month
    cal1._onNext();
    assert.isTrue(cal1.baseDate.isAfter(now, 'month'));

    //wait for calendar to update cells
    setTimeout(function() {
      //all cells should be empty or disabled
      var allCells = Polymer.dom(cal1.root).querySelectorAll('px-calendar-cell');
      allCells.forEach(function(cell, index) {
        var btn = Polymer.dom(cell.root).querySelector('div button');

        assert.isTrue(btn.hidden || btn.disabled);
      });
      done();
    }, 100);
  });

  test('cal2 works in month and allows future dates', function(done){

    assert.isTrue(cal2.baseDate.isSame(now, 'month'));
    //get next year
    cal2._onNext();
    assert.isTrue(cal2.baseDate.isAfter(now, 'year'));

    //wait for calendar to update cells
    setTimeout(function() {
      //all non empty cells should not be disabled
      var allCells = Polymer.dom(cal2.root).querySelectorAll('px-calendar-cell');
      allCells.forEach(function(cell, index) {
        var btn = Polymer.dom(cell.root).querySelector('div button');

        assert.isTrue(!btn.disabled);
      });
      done();
    }, 100);
  });

  test('cal3 works in years', function(){

    //get next 10 years
    cal3._onNext();
    assert.isTrue(cal3.baseDate.isAfter(now.clone().add(1, 'years'), 'year'));
  });

  test('change display mode', function(){

    //reset cal
    cal1.baseDate = now.clone();

    assert.equal(cal1.displayMode, 'day');
    cal1.displayMode = 'month';

    //get next year
    cal1._onNext();
    assert.isTrue(cal1.baseDate.isAfter(now, 'year'));

    //reset cal
    cal1.baseDate = now.clone();
    cal1.displayMode = 'year';

    //get next 10 year
    cal1._onNext();
    assert.isTrue(cal1.baseDate.isAfter(now.clone().add(1, 'years'), 'year'));
  });
});

suite('range vs single date', function() {
  let cal4, cal5, now;

  setup(function(done) {
    cal4 = fixture('calendar4');
    cal5 = fixture('calendar5');
    now = Px.moment();
    flush(()=>{
      done();
    });
  });

  test('range mode', function(done){

    var listener = function(evt) {
      //we have selected first and 11th day
      assert.equal(cal5.fromMoment.date(),1);
      assert.equal(cal5.toMoment.date(),11);

      flush(function() {
        //make sure 1st and 11th are selected, the one between are styled and the other not
        var allCells = Polymer.dom(cal5.root).querySelectorAll('px-calendar-cell'),
            i = 0,
            firstFound = false;
        allCells.forEach(function(cell, index) {
          var btnDiv = Polymer.dom(cell.root).querySelector('div');
          var btn = Polymer.dom(cell.root).querySelector('button');

          if((!btn.hidden && !firstFound) || i===10) {
            assert.isTrue(btnDiv.classList.contains('is-selected'));
            firstFound = true;
          } else if(i>0 && i<10) {
            assert.isTrue(btnDiv.classList.contains('is-between'));
          }
          else {
            assert.isFalse(btnDiv.classList.contains('is-between'));
            assert.isFalse(btnDiv.classList.contains('is-selected'));
          }

          if(firstFound) {
            i++;
          }
        });

        done();
      });
    };

    //select first and first +10 cell
    var allCells = Polymer.dom(cal5.root).querySelectorAll('px-calendar-cell'),
        i = 0,
        firstFound = false;
    allCells.forEach(function(cell, index) {
      var btn = Polymer.dom(cell.root).querySelector('div button');

      if(!btn.hidden && !firstFound) {
        btn.click();
        firstFound = true;
      }

      if(firstFound) {
        i++;
      }

      if(i===11) {
        btn.addEventListener('click', listener);
        btn.click();
      }
    });
  });

  test('single mode', function(done){

    var listener = function(evt) {
      //we have selected first and 11th day, make sure 11 is the actual result
      var selectedDate = cal4.fromMoment;
      assert.equal(selectedDate.date(), '11');
      assert.equal(selectedDate.month(), now.month());
      assert.equal(selectedDate.year(), now.year());
      flush(function() {
        //make sure only 11th is selected
        var allCells = Polymer.dom(cal4.root).querySelectorAll('px-calendar-cell'),
            i = 0,
            firstFound = false;
        allCells.forEach(function(cell, index) {
          var btnDiv = Polymer.dom(cell.root).querySelector('div');
          var btn = Polymer.dom(cell.root).querySelector('button');

          if(!btn.hidden && !firstFound) {
            firstFound = true;
          }

          if(i===10) {
            assert.isTrue(btnDiv.classList.contains('is-selected'));
            firstFound = true;
          }
          else {
            assert.isFalse(btnDiv.classList.contains('is-between'));
            assert.isFalse(btnDiv.classList.contains('is-selected'));
          }

          if(firstFound) {
            i++;
          }
        });

        done();
      });
    };

    //select first and first +10 cell
    var allCells = Polymer.dom(cal4.root).querySelectorAll('px-calendar-cell'),
        i = 0,
        firstFound = false;
    allCells.forEach(function(cell, index) {
      var btn = Polymer.dom(cell.root).querySelector('div button');
      if(!btn.hidden && !firstFound) {
        btn.click();
        firstFound = true;
      }

      if(firstFound) {
        i++;
      }

      if(i===11) {
        btn.addEventListener('click', listener);
        btn.click();
      }
    });
  });
});

suite('Block dates', function() {
  let calBlockBefore, calBlockAfter, now;

  setup(function(done) {
    calBlockBefore = fixture('calendarBlockBefore');
    calBlockAfter = fixture('calendarBlockAfter');
    calBlockBefore.set('minDate', Px.moment('2016-05-09T19:25:57.966Z'));
    calBlockAfter.set('maxDate', Px.moment('2016-05-09T19:25:57.966Z'));
    now = Px.moment();
    flush(()=>{
      done();
    });
  });

  test('block before 9th may 2016', function(done){
    //make sure 1st and 11th are selected, the one between are styled and the other not
    var allCells = Polymer.dom(calBlockBefore.root).querySelectorAll('px-calendar-cell');
    //make sure we're showing the right month
    calBlockBefore.baseDate = Px.moment('2016-05-09T19:25:57.966Z');

    debugger

    flush(function() {
      allCells.forEach(function(cell, index) {
        var btn = Polymer.dom(cell.root).querySelector('div button');

        if(index < 8) {
          assert.isTrue(btn.disabled);
        } else {
          assert.isTrue(!btn.disabled || btn.hidden);
        }
      });
      done();
    });
  });

  test('block after 9th may 2016', function(done){

    //make sure 1st and 11th are selected, the one between are styled and the other not
    var allCells = Polymer.dom(calBlockAfter.root).querySelectorAll('px-calendar-cell');
    //make sure we're showing the right month
    calBlockAfter.baseDate = Px.moment('2016-05-09T19:25:57.966Z');

    flush(function() {
      allCells.forEach(function(cell, index) {
        var btn = Polymer.dom(cell.root).querySelector('div button');

        if(index < 9) {
          assert.isFalse(btn.disabled);

        }
        else {
          assert.isTrue(btn.disabled || btn.hidden);
        }
      });
      done();
    });
  });
});
