export class Bird{
    constructor(x, y, width, height, urlImg){
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.jump = -5.5;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = urlImg;
    };
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

};

export function createPlatform(arr,ctx, x, y, width, img){
    let height = Math.floor(Math.random() * (380 - 150) + 150);
    let posX = x;
    let posY = y - height;

    ctx.drawImage(img, posX, posY, width, height)
    ctx.drawImage(img, posX, 0, width, posY - 150);

    arr.push({
        width,
        height,
        posX,
        posY,
    });
};
