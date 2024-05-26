export class Collectable {
    constructor(sprite, parent_sprite, icon_sprite, start_month, end_month, points, deltaY){
        this.sprite = sprite;
        this.parent_sprite = parent_sprite;
        this.icon_sprite = icon_sprite;
        this.start_month = start_month;
        this.end_month = end_month;
        this.points = points;
        this.deltaY = deltaY;
    }
}

export class Seed {
    constructor(sprite, icon_sprite, start_month, end_month, points, deltaY){
        this.sprite = sprite;
        this.icon_sprite = icon_sprite;
        this.start_month = start_month;
        this.end_month = end_month;
        this.points = points;
        this.deltaY = deltaY;
    }
}