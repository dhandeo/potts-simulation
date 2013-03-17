function start() 
    {

    var container = new SimulationContainer();
    var timer = null;
    var playing = 0;

    var ncontacts = 10;
    var naxons = 5;
    var ntargets = 100;

    $( "#contacts" ).slider({
      range: "min",
      value: 10,
      min: 2,
      max: 100,
      slide: function( event, ui ) {
        $( "#ncontacts" ).val( ui.value );
      }
    });
    $( "#ncontacts" ).val( $( "#contacts" ).slider( "value" ) );

    $( "#axons" ).slider({
      range: "min",
      value: 5,
      min: 2,
      max: 100,
      slide: function( event, ui ) {
        $( "#naxons" ).val( ui.value );
      }
    });
    $( "#naxons" ).val( $( "#axons" ).slider( "value" ) );

    $( "#targets" ).slider({
      range: "min",
      value: 100,
      min: 1,
      max: 1000,
      slide: function( event, ui ) {
        $( "#ntargets" ).val( ui.value );
      }
    });
    $( "#ntargets" ).val( $( "#targets" ).slider( "value" ) );

    // Add simulations
    for(var a = 0; a < ntargets; a++)
        {
        container.Add(new Target(ncontacts, ncontacts, naxons, a));
        }

    $( "#reset" ).button().click(function( event ) 
        {
        $( "#ncontacts" ).val( $( "#contacts" ).slider( "value" ) );
        $( "#naxons" ).val( $( "#axons" ).slider( "value" ) );
        $( "#ntargets" ).val( $( "#targets" ).slider( "value" ) );
        $( "#simulations" ).html("");
        container.Reset();
        for(var a = 0; a < ntargets; a++)
            {
            container.Add(new Target(ncontacts, ncontacts, naxons, a));
            }
        });

    $( "#play" ).button().click(function( event ) 
        {
        if(playing === 1)
            {
                    playing = 0;
                    // $("#play").button('option', 'label', 'Play / ');
                    window.clearInterval(timer);
            }
        else
            {
            playing = 1;
            timer = window.setInterval(function() 
                {
                //$("#play").button('option', 'label', 'Play');

                if(container.Animate() === 1)
                    {
                    playing = 0;
                    // $("#play").button('option', 'label', 'Play');
                    window.clearInterval(timer);
                    }
                }, 0);
            }
        });
    }