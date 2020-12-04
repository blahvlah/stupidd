let player: Sprite = null
let enemy: Sprite = null
let projecttile: Sprite = null
info.setLife(3)
info.score()
info.startCountdown(15)
player  = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . 8 8 1 1 . . . . . . . . .
    . . . 8 8 1 1 1 . . . . . . . .
    . . . 1 1 1 1 1 1 1 1 . . . . .
    . . . 8 8 1 1 1 1 1 1 1 . . . .
    . . . 8 8 1 1 1 1 1 1 1 . . . .
    . . . 1 1 1 1 1 1 1 1 . . . . .
    . . . 8 8 1 1 1 . . . . . . . .
    . . . 8 8 1 1 . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`,SpriteKind.Player)

enemy = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . 1 1 2 2 .
    . . . . . . . . . . 1 1 1 2 2 .
    . . . . . . . 1 1 1 1 1 1 1 1 .
    . . . . . . 1 1 1 1 1 1 1 2 2 .
    . . . . . . 1 1 1 1 1 1 1 2 2 .
    . . . . . . . 1 1 1 1 1 1 1 1 .
    . . . . . . . . . . 1 1 1 2 2 .
    . . . . . . . . . . . 1 1 2 2 .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
` ,SpriteKind.Enemy)

projecttile = sprites.createProjectileFromSprite(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . f f . . . . . . . .
    . . . . f f f f . . . . . . . .
    . . . . . . f f . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, player , 50, 0)

player.setPosition(20, 50)

controller.moveSprite(player)


game.onUpdateInterval(1000, function() {
enemy = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . 1 1 2 2 .
    . . . . . . . . . . 1 1 1 2 2 .
    . . . . . . . 1 1 1 1 1 1 1 1 .
    . . . . . . 1 1 1 1 1 1 1 2 2 .
    . . . . . . 1 1 1 1 1 1 1 2 2 .
    . . . . . . . 1 1 1 1 1 1 1 1 .
    . . . . . . . . . . 1 1 1 2 2 .
    . . . . . . . . . . . 1 1 2 2 .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
` ,SpriteKind.Enemy)
    enemy.setPosition(140,Math.randomRange(0, 100))
    enemy.setVelocity(-140, 0)

})


controller.A.onEvent (ControllerButtonEvent.Pressed,function() {
  projecttile = sprites.createProjectileFromSprite(img`
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . 8 8 1 1 . . . . . . . . . .
      . . 8 8 1 1 1 . . . . . . . . .
      . . 1 1 1 1 1 1 1 1 . . . . . .
      . . 8 8 1 1 1 1 1 1 1 . . . . .
      . . 8 8 1 1 1 1 1 1 1 . . . . .
      . . 1 1 1 1 1 1 1 1 . . . . . .
      . . 8 8 1 1 1 . . . . . . . . .
      . . 8 8 1 1 . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
  `, player , 50, 0)  
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
   info.changeLifeBy(-1)
   pause (400)
   if (info.life() == 0) {

       game.over()
   }

})


sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    otherSprite.startEffect(effects.blizzard)
})
