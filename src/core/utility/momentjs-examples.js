// API
// This plugin tries to change calendar system moment.js api by using locale method.
now = moment(); //get the current date and time,

// Parse
// Create a instance of moment from a Jalali (Persian) or Miladi date and time as string.more

// gregorian date
m = moment("1989/1/24", "YYYY/M/D");
m = moment.from("1989/1/24", "en", "YYYY/M/D");
m = moment.from("01/1989/24", "en", "MM/YYYY/DD");

// persian date
m = moment("1367/11/4", "jYYYY/jM/jD");
m = moment.from("1367/11/04", "fa", "YYYY/MM/DD");
m = moment.from("11/1367/04", "fa", "MM/YYYY/DD");

// it will change locale for all new moment instance
moment.locale("fa");
m = moment("1367/11/04", "YYYY/M/D");

// Display jalali or miladi date
// Display moment instance as a string.more
moment.locale("en"); // default locale is en
m = moment("1989/1/24", "YYYY/M/D");
m.locale("fa"); // change locale for this moment instance
m.format("YYYY/M/D"); // 1367/11/4
m.format("MM"); // 11 display jalali month
m.format("MMMM"); // Bahman
m.format("DD"); // 04 display day by two digit
m.format("DDD"); // 310 display day of year
m.format("w"); // 45 display week of year
m.locale("en");
m.format("M"); // 1 display miladi month
m.format("MM"); // 01 display month by two digit
m.format("MMMM"); // January
m.format("jYYYY/jM/jD [is] YYYY/M/D"); // 1367/11/4 is 1989/1/24

// Manipulate
// There are a number of methods to modify date and time.more
m.locale("fa");
m.year(1368); // set jalali year
//  If the range is exceeded, it will bubble up to the year.
m.month(3); // month will be 4 and m.format('M')=='4' , jMonth Accepts numbers from 0 to 11.
m.date(10); // set a date
m.format("YYYY/MM/D"); // 1368/4/10
m.subtract(1, "year"); // subtract a Jalali Year
m.format("YYYY/MM/D"); // 1367/4/10
m.add(2, "month"); // add two shamsi Month
m.format("YYYY/MM/D"); // 1367/6/10
m.endOf("month").format("YYYY/MM/D"); // 1367/6/31
m.startOf("year").format("YYYY/MM/D"); // 1367/1/1

// Validate
// Check a date and time.more
m = moment("1367/11/4", "jYYYY/jM/jD");
m.locale("fa");
m.isLeapYear(); // false
m.isSame(moment("1989-01-01", "YYYY-MM-DD"), "year"); // true
m.isSame(moment("1367-01-01", "jYYYY-jMM-jDD"), "year"); // true
m.isBefore(moment("1367-01-01", "jYYYY-jMM-jDD"), "month"); // false
m.isAfter(moment("1367-01-01", "jYYYY-jMM-jDD"), "jyear"); // false
m.isValid(); // true
moment("1396/7/31", "jYYYY/jM/jD").isValid(); // false
// validation demo in plunker

// Convert persian(Jalali , Shamsi, khorshidi) to gregorian (miladi) calendar system
moment
  .from("1392/6/3 16:40", "fa", "YYYY/M/D HH:mm")
  .format("YYYY-M-D HH:mm:ss"); // 2013-8-25 16:40:00

//
// Convert gregorian (miladi) to jalali (Shamsi, persian)
moment("2013-8-25 16:40:00", "YYYY-M-D HH:mm:ss")
  .locale("fa")
  .format("YYYY/M/D HH:mm:ss"); // 1392/6/31 23:59:59

// Change calendar system on changing its locale
moment.bindCalendarSystemAndLocale();
