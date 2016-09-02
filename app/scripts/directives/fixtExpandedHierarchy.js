angular.module('fixtApp') 
	.directive('fixtExpandedHierarchy', function(){
		return{
			restrict:'EA',
			replace: true,
			scope:{
                   myList: '='
			},
			
		    

		template: function(){
     
  var html= `<div class="sbxHierarchy">
  <div class="sBxbox1-2"><span id='close'><img src="styles/images/btn-close-sml.png" width="12" height="10" alt=""/></span></div>
 
	<div class="sBxheader">
		<div class="sBxtitle"> <span id="itm1" onclick="exchange(this.id)">Walmart SA12345678123- State DC</span><input id="itm1b" class="replace" type="text" value="" placeholder="I"></div>
<div class="sBxaction">
			<div class="sBxbox1-1">
            
            <div class="dropdown pull-right">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#"><span>Actions</span> <span><img src="styles/images/dropdwn-arrow-sml.png" width="16" height="9" alt=""/></span></a>
       
        <ul class="dropdown-menu ">
          <li><a href="#"><span class="imgBox  dropeHeight"><img src="styles/images/icon_create.png" width="16" height="18" alt=""/></span>Create Node</a></li>
          <li><a href="#"><span class="imgBox dropeHeight"><img src="styles/images/icon_export.png" width="16" height="16" alt=""/></span>Export</a></li>
          <li><a href="#"><span class="imgBox dropeHeight"><img src="styles/images/icon_jump.png" width="16" height="16" alt=""/></span>Go to EUAM</a></li> 
        </ul>
      </div>
            
            </div>
				
				
			</div><!---sBxaction end-->
	</div><!---sBxheader end-->
<!----Hierarchy chart colum starting-------------->
<div class="sbxHrchyCol">
		<div class="hrNode1-1"><span class="nodeIcon"><img src="styles/images/Hrchy-collapse.jpg" width="20" height="20" alt=""/></span>C000123456-Walmart</div>
        <div class="hrNode1-2"><span class="nodeIcon"><img src="styles/images/Hrchy-collapse.jpg" width="20" height="20" alt=""/></span>H 98564321 - East region</div>
 		<div class="hrNode1-3"><span class="nodeIcon"><img src="styles/images/Hrchy-collapse.jpg" width="20" height="20" alt=""/></span>BA 1234567891234-East region</div>
        <div class="hrNode1-4"><span class="nodeIcon"><img src="styles/images/Hrchy-collapse.jpg" width="20" height="20" alt=""/></span>1:1122334455667-East </div>
        <div class="hrNode1-5"><span class="nodeIcon"><img src="styles/images/Hrchy-collapse.jpg" width="20" height="20" alt=""/></span>1:1122334455667-East <span class="badge">234</span></div>
        <div class="hrNode1-6"><span class="nodeIcon"><img src="styles/images/Hrchy-expand.jpg" width="20" height="20" alt=""/></span>Sub Accounts 001-100</div>
        		<div class="hrNode2-1"><span class="nodeIcon"><img src="styles/images/Hrchy-child.jpg" width="10" height="10" alt=""/></span></div>
        		<div>{{myList}}</div>
                
                
        
        
	</div>
    <div class="sbxHrchyFooter">
        	<div class="sbxHrchyFtrLeft"><a href="#/sandbox">Back to card view</a></div>
            <div class="sbxHrchyFtrRight"><a href="#">Open in new card</a></div>
        </div><!-- sBxfooter end-->

</div> 
`
return html;
	
},
}

	


});