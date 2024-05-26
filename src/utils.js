export function addButton(txt, v, p, f) {
    const btn = add([
        sprite(`button${v}`),
        pos(p),
        area(),
        anchor("center"),
        scale(v==3?0.5:1)
    ])
    
    const bt_text = btn.add([
        text(txt, {font: "Chalkduster", size: 64}),
        anchor("center"),
        color(0, 0, 0),
    ])
    
    btn.onHoverUpdate(() => {
        btn.use(sprite(`button${v}_hover`)),
        bt_text.color = rgb(255,255,255),
        setCursor("pointer")
    })
    
    btn.onHoverEnd(() => {
        btn.use(sprite(`button${v}`)),
        bt_text.color = rgb(0,0,0)
    })

    btn.onClick(f)

    return btn

}