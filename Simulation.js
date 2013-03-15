// Simulation class

function Simulation(width, height, size) 
    {
    this.size = size || 10;

    // Create a div
    div =document.createElement('div');

    // Place holder for status text
    this.status =document.createElement('div');
    $(this.status).css({"float": "clear"});
    $(this.status).html("Status")
    $(this.status).appendTo(div)    

    // Create canvas and rendering context
    canvas =document.createElement('canvas');    
    this.ctx =  canvas.getContext("2d");
    $(canvas).appendTo(div);

    $(div).css({"float": "left"});
    $(div).appendTo('body');
    
    // Defines a local grid of y rows and x columns
    this.x = width;
    this.y = height;
    
    this.ctx.canvas.width  = this.x * this.size * 1.2;
    this.ctx.canvas.height = this.y * this.size * 1.2;
    
    // Variables defined for movement in animation
    this.flipx = 0;
    this.flipy = 0;     

    this.grid = new Array(this.y);
    for (var i = 0; i < this.y; i++) 
        {
        this.grid[i] = new Array(this.x);
        }
    
    // First color is background color and the rest are used
    this.palette = ["#FFFFFF" , "#E768AD", "#6D87D6"];
    
    // this.Init();
    };
    
Simulation.prototype.Draw = function() 
    {
    // Draws the simulation
    for(var i = 0; i < this.x;  i++)
        {
        for(var j = 0; j < this.y;  j++)  
            {
            // Select the colors from the pallette
            if (this.grid[i][j] >this.palette.length -1 )
                {
                this.ctx.fillStyle =this.palette[0];
                }
             else
                {
                this.ctx.fillStyle = this.palette[this.grid[i][j]]
                }
            //console.log(ctx.fillStyle);
            this.ctx.fillRect(i*this.size, j*this.size, this.size, this.size);
            }
        }
    };
    
Simulation.prototype.Init = function() 
    {
     // Defaults to random values between 1 and 2
     // Can inherit and customize this
     
    for(var i = 0; i < this.x;  i++)
        {
        for(var j = 0; j < this.y;  j++)  
            {
            this.grid[i][j] = Math.floor(Math.random()*2) + 1;
            //console.log(this.grid[i][j])
            }
        }      
    };

Simulation.prototype.Flip = function(i,j) 
    {
    if (this.grid[i][j] === 1)
        {
        this.grid[i][j] = 2;
        }
    else
        {
        this.grid[i][j] =  1;
        }
    }
    
Simulation.prototype.Animate = function(ctx) 
    {
     // Flip a pixel and move in random direction
    this.Flip(this.flipx, this.flipy);

     // Get the random direction to move
    var dirx = Math.floor(Math.random()*3) - 1;
    var diry = Math.floor(Math.random()*3) - 1;
    
     // Flip a pixel and move in random direction
    this.flipx = this.flipx + dirx;
    this.flipy = this.flipy + diry;
    
    // Reset it if it goes too far
    if(this.flipx >= this.x) this.flipx = 0;
    if(this.flipx < 0) this.flipx = this.x-1;
    
    if(this.flipy >= this.y) this.flipy = 0;
    if(this.flipy < 0) this.flipy = this.y-1;
    
    this.Draw(ctx, 15);
    }      
    
    
