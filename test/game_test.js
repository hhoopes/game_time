var chai = require('chai')
var assert = chai.assert;
var sinon = require('sinon');
var Game = require('../lib/game')
var Level = require('../lib/level');

describe("Game", function(){
  context("with assigned attributes", function(){
    var game = new Game;

    it("defaults to level 1", function(){
      assert.equal(game.currentLevel.number, 1)
    })

    it("can update its level to another level", function(){
      assert.notEqual(game.currentLevel.number, 0)
      game.updateLevel(0)

      assert.equal(game.currentLevel.number, 0)
    })

    it("can update its level attributes to the next level's", function(){
      var game = new Game
      var level = new Level(0);

      assert.equal(game.currentLevel.number, 1)

      game.updateLevel(0)

      assert.equal(game.currentLevel.number, 0)
      assert.equal(game.ball.x, level.ball.x)
      assert.equal(game.ball.y, level.ball.y)
      assert.equal(game.par, level.par)
      assert.equal(game.hole.x, level.hole.x)
    })
  })
})
