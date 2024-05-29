export function addButton(txt, v, p, f, s) {
    const btn = add([
        sprite(`button_${v}`),
        pos(p),
        area(),
        anchor("center"),
        scale(v==1||v==2?1:(v==3?0.5:0.75))
    ])
    
    const bt_text = btn.add([
        text(txt, {font: "chalkduster", size: 64}),
        anchor("center"),
        color(0, 0, 0),
    ])
    
    btn.onHoverUpdate(() => {
        btn.use(sprite(`button_${v}_hover`)),
        bt_text.color = rgb(255,255,255),
        setCursor("pointer")
    })
    
    btn.onHoverEnd(() => {
        btn.use(sprite(`button_${v}`)),
        bt_text.color = rgb(0,0,0),
        setCursor("default")
    })

    btn.onClick(f)

    return btn

}