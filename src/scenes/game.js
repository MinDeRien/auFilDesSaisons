import k from '../kaboom'
export function GameScene() {
    const bg_nb = 3; //TODO: set to 12 for real game
    const part_by_bg = 2;
    const part_width = 1920;
    const time_speed = 100;
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const days_by_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const player_speed = 300;
    const month_bg_width = part_by_bg * part_width;

    const backgrounds_top = [];
    const backgrounds_bottom = [];

    // load top backgrounds
    for (var i = 1; i <= bg_nb; i++) {
        for (var part = 1; part <= part_by_bg; part++) {
            k.loadSprite(`bg_${i}_${part}`, `sprites/background/${i}_${part}.png`)
        }
    }

    k.loadSprite("bean", "sprites/bean.png")

    // add top and bottom background
    for (var i = 1; i <= bg_nb; i++) {
        for (var part = 1; part <= part_by_bg; part++) {
            backgrounds_top.push(k.add([
                k.pos((i - 1) * 3840 + (part - 1) * 1920, 0),
                k.sprite(`bg_${i}_${part}`),
                k.z(0),
                k.move(k.LEFT, time_speed)
            ]));
            backgrounds_bottom.push(k.add([
                k.pos((i - 1) * 3840 + (part - 1) * 1920, 540),
                k.sprite(`bg_${i}_${part}`),
                k.z(0),
                k.move(k.LEFT, time_speed)
            ]));
        }
    }

    loadAseprite("player", "sprites/player1.png", "sprites/player1.json")

    player1 = k.add([k.pos(50, 385), k.sprite("player"), k.z(5), anchor("bot")])
    player1.play("idle")
    player2 = k.add([k.pos(50, 925), k.sprite("player"), k.z(5), , anchor("bot")])
    player2.play("idle")

    dateText = k.text("")
    k.add([dateText, pos(960, 540),  anchor("center")])

    player1.onUpdate(() => {
        if (player1.pos.x < 20) { player1.pos.x = 20 };
        if (player1.pos.x > 1900) { player1.pos.x = 1900 };
    })
    player2.onUpdate(() => {
        if (player2.pos.x < 20) { player2.pos.x = 20 };
        if (player2.pos.x > 1900) { player2.pos.x = 1900 };
    })

    k.onUpdate(() => {
        var time_pos = (backgrounds_top[0].pos.x * -1)
        var month = Math.floor(time_pos / month_bg_width)
        var day = Math.floor((time_pos % month_bg_width) / (part_width / days_by_months[month])) + 1;
        dateText.text = `${day} ${months[month]}`

        if (day > days_by_months[month]) {
            backgrounds_top.forEach(element => {
                element.pos.x -= part_width;
            });
            backgrounds_bottom.forEach(element => {
                element.pos.x -= part_width;
            });
            player1.pos.x = 50
            player2.pos.x = 50
        }
    })

    onKeyDown("a", () => {
        player1.move(-player_speed, 0)
        player1.flipX = true;
        if (player1.curAnim() !== "walk") {
            player1.play("walk")
        }
    })

    onKeyDown("d", () => {
        player1.move(player_speed, 0)
        player1.flipX = false;
        if (player1.curAnim() !== "walk") {
            player1.play("walk")
        }
    })

    onKeyDown("left", () => {
        player2.move(-player_speed, 0)
        player2.flipX = true;
        if (player2.curAnim() !== "walk") {
            player2.play("walk")
        }
    })

    onKeyDown("right", () => {
        player2.move(player_speed, 0)
        player2.flipX = false;
        if (player2.curAnim() !== "walk") {
            player2.play("walk")
        }
    });

    ["left", "right"].forEach((key) => {
        onKeyRelease(key, () => {
        // Only reset to "idle" if player is not holding any of these keys
            if (!isKeyDown("left") && !isKeyDown("right")) {
                player2.play("idle")
            }
        })
    });

    ["a", "d"].forEach((key) => {
        onKeyRelease(key, () => {
        // Only reset to "idle" if player is not holding any of these keys
            if (!isKeyDown("a") && !isKeyDown("d")) {
                player1.play("idle")
            }
        })
    });
}