
        var contador = 0;
        let lacinho = [];
        function minhaFunc(){
            
            if(document.getElementById("demo").innerHTML == "O JavaScript pode mudar o conteúdo")
            {
                document.getElementById("demo").innerHTML = "Olá JavaScript";
                window.alert("trocando informação");

                console.log("informação trocado");
                contador++;
            }
            else
            {
                document.getElementById("demo").innerHTML = "O JavaScript pode mudar o conteúdo";
                console.log("O texto foi alterado " + contador + " vezes.");
            }          

        }
            
        function testzin(){ //subtraindo caracteres
            var num = "1", nnu= "a", total= '10'

            //console.log(num+nu)

            console.log(total - "1");
            console.log(total + "1");
        }

        function arrayTest(){
            lacinho.push("coca-cola");
            lacinho.push("bata");
            console.log(lacinho[0]);
            console.log(lacinho[1]);
        }
        function lacoRepet()
        {
            for( i =0; i == lacinho.length; i++ )
            {
                document.getElementById("vlref").innerHTML = lacinho[i];
            }
        
        }