angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directiveTemplates/addCategoryTemplate.html',
    " <span ng-show=showAddCategories><div class=addCategory class=margin-topbottom-oneEm><button class=\"floatLeft marginRight-pointSevenFive\" ng-click=\"showAddCategories_add = !showAddCategories_add\">New Category</button> <span class=floatLeft ng-show=showAddCategories_add><form name=addCategoryForm novalidate class=addCategoryTemplate-addCategoryForm><input ng-model=categories.newCategory.label placeholder=\"Name of category\" required><input ng-model=categories.newCategory.size placeholder=\"Size scale\" required><input ng-model=categories.newCategory.opacity placeholder=\"Opacity scale\" required><button ng-click=categories.add(categories.newCategory) ng-disabled=addCategoryForm.$invalid>Add Category</button>  <span class=\"error addCategoryTemplate-addError\" ng-show=addCategoryTemplateAddCategoryError>Error! Please try again.</span></form></span></div><div class=margin-topbottom-oneEm><button class=\"floatLeft marginRight-pointSevenFive\" ng-click=\"showAddCategories_delete = !showAddCategories_delete\">Delete Category</button> <span class=floatLeft ng-show=showAddCategories_delete><form name=deleteCategoryForm novalidate class=addCategoryTemplate-deleteCategoryForm><select ng-model=categories.selected.categoryToDelete ng-options=\"category as category.label for category in categories.list\"></select><button ng-click=categories.delete(categories.selected.categoryToDelete) ng-disabled=\"categories.selected.categoryToDelete.label ==='meal' || \n" +
    "\t\t\t\tcategories.selected.categoryToDelete.label ==='exercise' ||\n" +
    "\t\t\t\tcategories.selected.categoryToDelete.label ==='work' ||\n" +
    "\t\t\t\tcategories.selected.categoryToDelete.label ==='sleep'\">Delete</button>  <span class=\"error addCategoryTemplate-DeleteError\" ng-show=addCategoryTemplateDeleteCategoryError>Error! Please try again.</span></form></span></div></span>"
  );


  $templateCache.put('directiveTemplates/addTemplate.html',
    "<div ng-show=showAdd><form name=addForm novalidate class=addTemplate-addForm><span time=\"\" required></span> <div class=sliderWidth ui-slider=\"{orientation: 'horizontal', range: 'min'}\" min=0 max=5 step=1 ng-model=input.level required></div><span class=energyLevelCaption required>Energy level: {{input.level}}</span> <input class=addNote ng-model=input.note placeholder=Note required><span category-options-list=\"\" required></span>  <button ng-click=\"addEvent(input.level, input.note, categories.selected.category.value)\" ng-disabled=\"addForm.$invalid ||  categories.selected.category.label === 'Choose a category' || input.size == null || input.opacity == null\" ng-class=\"{'button-color': addForm.$valid && categories.selected.category.label !== 'Choose a category' && input.size != null && input.opacity != null}\">Add</button> <div class=addNotice><span class=red ng-show=\"addForm.$invalid ||  categories.selected.category.label === 'Choose a category' || input.size == null || input.opacity == null\">Please fill out all inputs.</span> <span class=green ng-hide=\"addForm.$invalid ||  categories.selected.category.label === 'Choose a category' || input.size == null || input.opacity == null\">Ready to add!</span></div><span class=\"error addTemplate-addError\" ng-show=addTemplateAddError>Error! Please try again.</span> <div more-category-inputs=\"\"></div></form></div>"
  );


  $templateCache.put('directiveTemplates/categoryOptionsListTemplate.html',
    "<select ng-model=categories.selected.category ng-options=\"category as category.label for category in categories.list\"></select>"
  );


  $templateCache.put('directiveTemplates/customTimeFilterTemplate.html',
    "<span class=customTime><datepicker ng-model=calendar.firstDate></datepicker><datepicker ng-model=calendar.secondDate></datepicker><button ng-click=\"customLengthTime(calendar.firstDate, calendar.secondDate)\">Custom</button></span>"
  );


  $templateCache.put('directiveTemplates/filterTemplate.html',
    "<span ng-show=showFilterdir><div class=filterTemplate-timeFilters>Time Filters <button ng-click=\"filterTime('day')\">Day</button> <button ng-click=\"filterTime('week')\">Week</button> <button ng-click=\"filterTime('month')\">Month</button> <button ng-click=resetFilters()>All</button> <button ng-click=\"showCustomTime = !showCustomTime\">Custom timeframe</button> <span ng-show=showCustomTime><span custom-time-filter=\"\"></span></span></div><div>Activity Filters <button ng-click=\"filterCategory('meal')\">Meal</button> <button ng-click=\"filterCategory('exercise')\">Exercise</button> <button ng-click=\"filterCategory('work')\">Work</button> <button ng-click=\"filterCategory('sleep')\">Sleep</button> <button ng-click=resetFilters()>None</button></div></span>"
  );


  $templateCache.put('directiveTemplates/modifyTemplate.html',
    "<div ng-show=showModify><div><form name=modifyForm novalidate class=modifyTemplate-modifyForm><div class=modifyTimeSpan>{{event.selected.date | date:'medium'}}</div><div class=\"sliderWidth modify-e-slider\" ui-slider=\"{orientation: 'horizontal', range: 'min'}\" min=0 max=5 step=1 ng-model=event.selected.energylevel></div><span class=modify-e-caption>Energy Level: {{event.selected.energylevel}}</span></form></div><div><input class=modifyTemplate-noteSize ng-model=event.selected.note placeholder=Note minlength=1><button ng-click=updateEvent(event) ng-disabled=\"modifyForm.$invalid || event.selected.energylevel == null || event.selected.note.length < 1\">Update Event</button> <button ng-click=deleteEvent(event) ng-disabled=modifyForm.$invalid>Delete Event</button> <span class=\"error modifyTemplate-addError\" ng-show=modifyTemplateAddError>Error! Please try again.</span></div></div>"
  );


  $templateCache.put('directiveTemplates/moreCategoryInputsTemplate.html',
    "<div class=moreCategoryInputsTemplate><div ng-show=show.meal><div class=mealSlider-caption><div class=\"sliderWidth sliderInMeal sizeSlider\" ui-slider=\"{orientation: 'horizontal', range: 'min'}\" min=0 max=5 step=1 ng-model=input.size></div><span>How full do you feel? {{input.size}}</span></div><form><input ng-model=input.checkbox.dairy type=checkbox>Dairy<input ng-model=input.checkbox.fruits type=checkbox>Fruits<input ng-model=input.checkbox.grains type=checkbox>Grains<input ng-model=input.checkbox.meat type=checkbox>Meat<input ng-model=input.checkbox.vegetables type=checkbox>Vegetables</form></div><div ng-repeat=\"category in categories.list\" class=cat><div ng-show={{category.show}} class={{category.label}}><div><span class=moreCategories-slider-caption>{{category.size}}: {{input.size}}</span><div class=\"sliderWidth slidersInMoreCategories sizeSlider\" ui-slider=\"{orientation: 'horizontal', range: 'min'}\" min=0 max={{category.sizeCeiling}} step=1 ng-model=input.size></div><div class=\"sliderWidth slidersInMoreCategories opacitySlider\" ui-slider=\"{orientation: 'horizontal', range: 'min'}\" min=0 max={{category.opacityCeiling}} step=1 ng-model=input.opacity></div><span class=moreCategories-slider-caption>{{category.opacity}}: {{input.opacity}}</span></div></div></div></div>"
  );


  $templateCache.put('directiveTemplates/larger_components/graph_component.html',
    "<graph data=lifeEventsInView category=category.setTo select=event.selected></graph>"
  );


  $templateCache.put('directiveTemplates/larger_components/instructions_component.html',
    "<span><h3>About</h3><p>I once performed a experiment: for 21 days, I recorded in a journal all of my daily activities, include meals, exercise, work habits, and energy level.</p><p>On the days I exercised for 30 minutes, I tended to be more productive. On days I drank coffee, I found an extra-focused 2 1/2 hours of productivity. Analyzing my days, I gained a new sense of self awareness.</p>But what if I could create a tool to track and analyze my productivity? Productive Journal is my answer. This page shows sample data for how a user might use this app to find trends in their schedule.<p><b>ADD events:</b> From meals, exercising, or anything you choose to track.</p><p><b>MODIFY events:</b> Make a mistake adding an event? No problem.</p><p><b>CREATE:</b> your own categories.</p><p><b>FILTER:</b> by time (day, week, month, custom!), or activity (meal, exercise, etc). In the list-view, you can also click Date to show events from a certain date; Time to filter events at a certain time (eg. eating dinner at 7pm everyday), and by category.</p><p><b>SIGN UP:</b> for your own account today!</p></span> "
  );


  $templateCache.put('directiveTemplates/larger_components/log_component.html',
    "<div class=log ng-show=\"lifeEventsInView.length > 0\"><table class=log-table><th ng-click=resetFilters()>Date</th><th ng-click=resetFilters()>Time</th><th ng-click=resetFilters()>Category</th><th ng-click=resetFilters()>Note</th><tr class=events-in-log ng-repeat=\"event in lifeEventsInView track by $index | filter: filters\"><td ng-click=filterDate(event.date)>{{event.date | date:'shortDate'}}</td><td ng-click=filterHour(event.date)>{{event.date | date:'shortTime'}}</td><td ng-click=filterCategory(event.category)>{{event.category | limitTo: 15}}</td><td class=trimmed-notes>{{event.note | limitTo: 22}}</td></tr></table></div>"
  );


  $templateCache.put('directiveTemplates/larger_components/loglarge_component.html',
    "<div class=\"log log-view-large\" ng-show=\"lifeEventsInView.length > 0\"><table class=log-table><th ng-click=resetFilters()>Date</th><th ng-click=resetFilters()>Time</th><th ng-click=resetFilters()>Category</th><th ng-click=resetFilters()>Energy</th><th ng-click=resetFilters()>Size</th><th ng-click=resetFilters()>Opacity</th><th class=notesCursor ng-click=resetFilters()>Note</th><tr class=events-in-log ng-repeat=\"event in lifeEventsInView | filter: filters\"><td ng-click=filterDate(event.date)>{{event.date | date:'shortDate'}}</td><td ng-click=filterHour(event.date)>{{event.date | date:'shortTime'}}</td><td ng-click=filterCategory(event.category)>{{event.category}}</td><td ng-click=filterEnergy(event.energylevel)>{{event.energylevel}}</td><td ng-click=filterSize(event.size)>{{event.size}}</td><td ng-click=filterOpacity(event.opacity)>{{event.opacity}}</td><td class=notesCursor>{{event.note}}</td></tr></table></div><instructions class=\"inlineblock instructions log\" ng-show=showInstructions></instructions>"
  );


  $templateCache.put('directiveTemplates/larger_components/logsmall_component.html',
    "<div class=inlineblock ng-show=!showInstructions><div class=log ng-show=\"lifeEventsInView.length > 0\"><table class=log-table><th ng-click=resetFilters()>Date</th><th ng-click=resetFilters()>Time</th><th ng-click=resetFilters()>Category</th><th class=notesCursor ng-click=resetFilters()>Note</th><tr class=events-in-log ng-repeat=\"event in lifeEventsInView track by $index | filter: filters\"><td ng-click=filterDate(event.date)>{{event.date | date:'shortDate'}}</td><td ng-click=filterHour(event.date)>{{event.date | date:'shortTime'}}</td><td ng-click=filterCategory(event.category)>{{event.category | limitTo: 15}}</td><td class=notesCursor>{{event.note | limitTo: 22}}</td></tr></table></div></div><instructions class=\"inlineblock instructions log\" ng-show=showInstructions></instructions>"
  );


  $templateCache.put('directiveTemplates/larger_components/navbar-loggedIn_component.html',
    "<nav class=\"navbar navbar-default cf navbar-higher\"><div class=navbar-view-options><span class=button-outer><span class=\"pad-right opacity-half\"><a href=#/view/graph><i class=\"lower-lg-icon fa fa-bar-chart-o fa-lg\"></i></a></span> <span class=\"pad-right opacity-half\"><a href=#/view/log><i class=\"lower-lg-icon fa fa-list-alt fa-lg\"></i></a></span> <span class=\"pad-right opacity-half\"><a href=#/view/main><i class=\"lower-lg-icon fa fa-bar-chart-o\"></i><i class=\"small fa fa-list-alt\"></i></a></span></span><div class=navbar-text-view>View</div></div><div class=navbar-add-event ng-click=\"showInNav('showAdd')\"><i class=\"opacity-half lower-2x-icon fa fa-plus-circle fa-2x\"></i><div class=navbar-text-add>Add Event</div></div><div class=\"navbar-account opacity-half\"><i class=\"lower-lg-icon fa fa-calendar-o fa-lg\"></i><li class=\"dropdown navbar-text-account\"><a class=dropdown-toggle>My Account</a><ul class=dropdown-menu><li><a ng-click=logout()><i class=\"fa fa-share\"></i> Sign out</a></li></ul></li><i class=\"lower-lg-icon fa fa-angle-down fa-lg\"></i></div></nav>"
  );


  $templateCache.put('directiveTemplates/larger_components/navbar-lower_component.html',
    "<div class=\"navbar navbar-lower navbar-default-lower cf\"><ul class=lower-navbar-items><button ng-click=\"showInNav('showAddCategories')\">Categories</button> <button ng-click=\"showInNav('showModify')\">Modify Events</button> <button ng-click=\"showInNav('showFilterdir')\">Filter</button></ul><i ng-click=\"showInstructions = !showInstructions\" class=\"toggle-instructions-icon fa fa-question fa-2x\"></i></div>"
  );


  $templateCache.put('directiveTemplates/larger_components/navbarnotLoggedIncomponent.html',
    "<nav class=\"navbar navbar-default cf navbar-higher\"><div class=navbar-view-options><span class=button-outer><span class=\"pad-right opacity-half\"><a href=#/view/graph><i class=\"lower-lg-icon fa fa-bar-chart-o fa-lg\"></i></a></span> <span class=\"pad-right opacity-half\"><a href=#/view/log><i class=\"lower-lg-icon fa fa-list-alt fa-lg\"></i></a></span> <span class=\"pad-right opacity-half\"><a href=#/view/main><i class=\"lower-lg-icon fa fa-bar-chart-o\"></i><i class=\"small fa fa-list-alt\"></i></a></span></span><div class=navbar-text-view>View</div></div><div class=navbar-add-event ng-click=\"showInNav('showAdd')\"><i class=\"opacity-half lower-2x-icon fa fa-plus-circle fa-2x\"></i><div class=navbar-text-add>Add Event</div></div><div class=navbar-signup ng-click=loadData()><i class=\"opacity-half lower-lg-icon fa fa-facebook-square fa-lg\">Sign up</i></div><div class=navbar-login-notSignedIn ng-click=loadData()><i class=\"opacity-half lower-lg-icon fa fa-facebook-square fa-lg\">Login</i></div></nav>"
  );


  $templateCache.put('directiveTemplates/larger_components/options-area_component.html',
    "<div class=options-area><div class=options-area-component ng-show=showFilterdir filterdir=\"\"></div><div class=options-area-component ng-show=showAddCategories add-category=\"\"></div><div class=options-area-component ng-show=showModify modify=\"\"></div><div class=options-area-component ng-show=showAdd add=\"\"></div><div class=\"sampleData options-area-sampleData\" ng-hide=\"hideSampleDataHeader || eventService.Auth.authLevel > 0\">This sample page shows how you might use this tool to track your productivity and energy level. Feel free to try it! Add new events, filter them, and so on. <span class=closeSampleDataHeader ng-click=\"hideSampleDataHeader = !hideSampleDataHeader\">X</span></div><div class=\"error options-area-loadDataError\" ng-show=optionsAreaLoadDataError>Error! Please try logging in again.</div></div>"
  );


  $templateCache.put('partials/backupMain.ejs',
    "<nav class=\"navbar navbar-default\"><div class=navbar-view-options><span class=button-outer><span class=icon><i class=\"lower-lg-icon fa fa-bar-chart-o fa-lg\"></i></span> <span class=icon><i class=\"lower-lg-icon fa fa-list-alt fa-lg\"></i></span> <span class=icon><i class=\"lower-lg-icon fa fa-bar-chart-o\"></i><i class=\"small fa fa-list-alt\"></i></span></span><div class=navbar-text-view>View</div></div><div class=navbar-add-event ng-click=\"showInNav('showAdd')\"><i class=\"lower-2x-icon fa fa-plus-circle fa-2x\"></i><div class=navbar-text-add>Add Event</div></div><div class=navbar-account><i class=\"lower-lg-icon fa fa-calendar-o fa-lg\"></i><li class=\"dropdown navbar-text-account\"><a class=dropdown-toggle>My Account</a><ul class=dropdown-menu><li><a href=#><i class=\"fa fa-cog fa-lg\"></i> Settings</a></li><li><a href=#><i class=\"fa fa-share\"></i> Sign out</a></li></ul></li><i class=\"lower-lg-icon fa fa-angle-down fa-lg\"></i></div><div class=navbar-login ng-click=loadData()><i class=\"lower-lg-icon fa fa-facebook-square fa-lg\">Login</i></div></nav><div class=\"navbar navbar-lower navbar-default\"><ul class=lower-navbar-items><button ng-click=\"showInNav('showAddCategories')\">Categories</button> <button ng-click=\"showInNav('showModify')\">Events</button> <button ng-click=\"showInNav('showFilterdir')\">Time/Activity Filter</button></ul></div><article><div class=options-area><div filterdir=\"\"></div><div add-category=\"\"></div><div modify=\"\"></div><div add=\"\"></div></div><graph data=lifeEventsInView category=category.setTo select=event.selected></graph><div class=log ng-show=\"lifeEventsInView.length > 0\"><table class=log-table><th ng-click=resetFilters()>Date</th><th ng-click=resetFilters()>Time</th><th ng-click=resetFilters()>Category</th><th ng-click=resetFilters()>Note</th><tr class=events-in-log ng-repeat=\"event in lifeEventsInView track by $index | filter: filters\"><td ng-click=filterDate(event.date)>{{event.date | date:'shortDate'}}</td><td ng-click=filterHour(event.date)>{{event.date | date:'shortTime'}}</td><td ng-click=filterCategory(event.category)>{{event.category | limitTo: 15}}</td><td class=trimmed-notes>{{event.note | limitTo: 22}}</td></tr></table></div></article>"
  );


  $templateCache.put('partials/graph.ejs',
    "<nav navbarloggedin=\"\"></nav><div navbarlower=\"\"></div><article><optionsarea></optionsarea><graphlargercomponents class=graph-view-large></graphlargercomponents><instructions class=\"inlineblock instructions log\" ng-show=showInstructions></instructions></article>"
  );


  $templateCache.put('partials/log.ejs',
    "<nav navbarloggedin=\"\"></nav><div navbarlower=\"\"></div><article><optionsarea></optionsarea><loglarge></loglarge></article>"
  );


  $templateCache.put('partials/main.ejs',
    "<nav navbarloggedin=\"\"></nav><div navbarlower=\"\"></div><article><optionsarea></optionsarea><graphlargercomponents></graphlargercomponents><logsmall></logsmall></article>"
  );


  $templateCache.put('partials/notLoggedIn.ejs',
    "<div navbarnotloggedin=\"\"></div><div navbarlower=\"\"></div><article><optionsarea></optionsarea><graphlargercomponents></graphlargercomponents><logsmall></logsmall></article>"
  );

}]);
