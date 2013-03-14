// Simulation class

function Simulation(width, height) 
    {
    // Defines a local grid of y rows and x columns
    this.x = width;
    this.y = height;
    
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
    
    };
    
Simulation.prototype.Draw = function(ctx) 
    {
    var size=10;
    // Draws the simulation
    for(var i = 0; i < this.x;  i++)
        {
        for(var j = 0; j < this.y;  j++)  
            {
            // Select the colors from the pallette
            if (this.grid[i][j] >this.palette.length -1 )
                {
                ctx.fillStyle =this.palette[0];
                }
             else
                {
                ctx.fillStyle = this.palette[this.grid[i][j]]
                }
            ctx.fillRect(i*size, j*size, size, size);
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
    
    this.Draw(ctx);
    }      
    
    
