
            $(document).ready(function(){
              var date_input=$('input[name="date"]'); //our date input has the name "date"
              var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
              var options={
                format: 'mm/dd/yyyy',
                container: container,
                todayHighlight: true,
                autoclose: true,
                startDate: '+1d',
                endDate: '+90d',
              };
              date_input.datepicker(options);
            })

            function testResort(val) {
              if(val=='DLR'){
                const dlrElements = document.querySelectorAll('#DLRdrops');
                dlrElements.forEach((element) => {
                element.classList.remove('hidden');
                });
                const wdwElements = document.querySelectorAll('#WDWdrops');
                wdwElements.forEach((element) => {
                element.classList.add('hidden');
                });
              }
              else if (val=='WDW'){
                const wdwElements = document.querySelectorAll('#WDWdrops');
                wdwElements.forEach((element) => {
                element.classList.remove('hidden');
                });
                const dlrElements = document.querySelectorAll('#DLRdrops');
                dlrElements.forEach((element) => {
                element.classList.add('hidden');
              });
            }
            else {
                const dlrElements = document.querySelectorAll('#DLRdrops');
                dlrElements.forEach((element) => {
                element.classList.add('hidden');
            });
            const wdwElements = document.querySelectorAll('#WDWdrops');
                wdwElements.forEach((element) => {
                element.classList.add('hidden');
                });
            }
        }
            /*function showDLRdrops(){
              document.getElementById('DLRkey').style.display = 'block';
              document.getElementById('DLRpark').style.display = 'block';
              
              document.getElementById('selectDate').style.display = 'block';
              document.getElementById('calendarForm').style.display = 'block';
              document.getElementById('subButton').style.display = 'block';
              document.getElementById('WDWpass').style.display = 'none';
              document.getElementById('WDWpark').style.display = 'none';

            }

            function showWDWdrops(){
              document.getElementById('WDWpass').style.display = 'block';
              document.getElementById('WDWpark').style.display = 'block';
              document.getElementById('selectDate').style.display = 'block';
              document.getElementById('calendarForm').style.display = 'block';
              document.getElementById('subButton').style.display = 'block';
              document.getElementById('DLRkey').style.display = 'none';
              document.getElementById('DLRpark').style.display = 'none';
             
            }*/

            function submitForm(){
              resort = document.querySelector('#selectResort').value;
            
              if (resort=='DLR'){
                pass = document.querySelector('#selectDLRkey').value
                park = document.querySelector('#selectDLRpark').value
              }else if (resort=='WDW'){
                pass = document.querySelector('#selectWDWpass').value
                park = document.querySelector('#selectWDWpark').value
              }
              parkDate=document.querySelector('#date').value
              
              const result = new userData(resort, pass, park, parkDate);
              console.log(result);
              
            }
            function userData(resort, pass, park, parkDate){
              
              this.resort = resort;
              this.pass = pass;
              this.park = park;
              this.date = parkDate;
            }
            
            const apiKey='https://disneyland.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=inspire-key-pass,believe-key-pass,enchant-key-pass,imagine-key-pass,dream-key-pass&destinationId=DLR&numMonths=14'
            

