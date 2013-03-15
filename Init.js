
function start() 
    {

    var container = new SimulationContainer();
    var timer = null;
    var playing = null;
    
    // Add two simulations
    for(var a = 0; a < 50; a ++)
        {
        container.Add(new SynapticRearrangement(5, 5, 3));
        }

    $( "#play" ).button();
    $( "#play" ).click(function( event ) 
        {
        if(playing === 1)
            {
            clearInterval(timer);
            $("#play").html("Play");
            playing = 0;
            }
        else
            {
            timer = window.setInterval(function() 
                {
                $("#play").html("Pause");

                if(container.Animate() === 1)
                    {
                    playing = 0;
                    $("#play").html("Play");
                    window.clearInterval(timer);
                    }
                }, 0);
            playing = 1;
            }
        });
    }
