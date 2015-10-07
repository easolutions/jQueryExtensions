/// <reference path="jquery-1.7.2-vsdoc.js" />
/// <reference path="jquery-ui-1.8.11.js" />
/// <reference path="jquery-easolutions-1.2.2.js" />

/*
File:        Test.jquery-easolutions.js
Version:     1.2.1
Description: QUnit test of "jquery.easolutions-*.js".
Author:      Michael Erickson, Erickson and Associates.
Created:     2012-02-14
Language:    Javascript - JQuery
Website:     http://www.merickson.com/
Contact:     support@merickson.com

*/

function testSpace(sName, sHTML) {
    ok(true, sName);

    var jqTestItem = $("ol#qunit-tests > li:last");
    jqTestItem.append('<div id="testSpaceContainer" style="display:none;">' + sHTML + '</div>');

    var jqTestSpace = jqTestItem.children("div#testSpaceContainer:first");

    var moveTestSpaceStart = $.TimeStamp();
    var moveTestSpace = function () {
        var jqTestArea = jqTestItem.find("ol > li:contains(" + sName + ")").filter(function () { return $(this).text() == sName; });
        if (jqTestArea.length <= 0) {
            if (!$.HasTimedOut(moveTestSpaceStart, 5000)) setTimeout(moveTestSpace, 200);
            return false;
        }
        var oTestSpace = jqTestSpace.detach();
        jqTestArea.append(oTestSpace);
        jqTestArea.find("div#testSpaceContainer").show();
        return true;
    }
    moveTestSpace();

    return jqTestSpace.children().first();
}

var oTest = {
    something: "xxx", quoteTest: 'a "test" for quote\'s',
    aArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 2, 1],
    aObject: { a: 1, b: 2, c: 3, d: 4, e: 5 },
    afunction: function () { }
};

for (var idx = 20; idx < 30; idx++)
    oTest.aArray[idx] = idx + 1;

oTest.aArray["aa"] = 101;
oTest.aArray["bb"] = 102;
oTest.aArray["cc"] = 103;
oTest.aArray["dd"] = 104;

//for (var k in oTest.aArray) {
//    console.log("oTest.aArray[%s] = :%s: '%s' '%s'", k.toString(), oTest.aArray[k].toString(), (typeof k), (typeof oTest.aArray[k]));
//}
console.log("oTest.aArray.length = %d", oTest.aArray.length);

//=================================================================================================
// ECMAScript 5 (ES5) Testing Notes
//    On most modern day browsers, the ES5 methods are implemented. These methods are only defined
//    in the EA Solutions Javascript file if the browser does not provide the implementation. Therefore
//    to test the methods in the EA Solutions Javascript file we use the methods defined in the global
//    object "g_JQueryEASolutions_oES5" instead.
//=================================================================================================
// Define alias to simplify coding of tests.
var ES5 = g_JQueryEASolutions_oES5;

//=================================================================================================
test("Object.keys (ES5)", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    raises(function () { ES5.Object.keys(); }, "ES5.Object.keys() should throw error.");
    raises(function () { ES5.Object.keys(undefined); }, 0, "ES5.Object.keys(undefined) should throw error.");
    raises(function () { ES5.Object.keys(null); }, 0, "ES5.Object.keys(null) should throw error.");
    equal(ES5.Object.keys([]).length, 0, "ES5.Object.keys([]).length");
    equal(ES5.Object.keys({}).length, 0, "ES5.Object.keys({}).length");
    equal(ES5.Object.keys(oTest).length, 5, "ES5.Object.keys(oTest).length");
    equal(ES5.Object.keys(oTest)[1], "quoteTest", "ES5.Object.keys(oTest)[1]");
    equal(ES5.Object.keys(oTest.aArray).length, 22, "ES5.Object.keys(oTest.aArray).length");
    equal(ES5.Object.keys(oTest.aObject).length, 5, "ES5.Object.keys(oTest.aArray).length");
    equal(ES5.Object.keys(oTest.aObject)[0], "a", "ES5.Object.keys(oTest.aArray).length");
});

//=================================================================================================
test("Array.prototype.forEach (ES5)", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    var iTest = 0;

    iTest = 0; ES5.Array.prototype.forEach.call(undefined, function (item, idx, array) { iTest++; });
    equal(iTest, 0, "ES5.Array.prototype.forEach.call(undefined, function() { iTest++; })");

    iTest = 0; ES5.Array.prototype.forEach.call(null, function (item, idx, array) { iTest++; });
    equal(iTest, 0, "ES5.Array.prototype.forEach.call(null, function() { iTest++; })");

    iTest = 0; ES5.Array.prototype.forEach.call([], function (item, idx, array) { iTest++; });
    equal(iTest, 0, "ES5.Array.prototype.forEach.call([], function() { iTest++; })");

    iTest = 0; ES5.Array.prototype.forEach.call(oTest.aArray, function (item, idx, array) { iTest++; });
    equal(iTest, 22, "ES5.Array.prototype.forEach.call(oTest.aArray, function() { iTest++; })");

    iTest = 0; ES5.Array.prototype.forEach.call(oTest.aObject, function (item, idx, array) { iTest++; });
    equal(iTest, 0, "ES5.Array.prototype.forEach.call(oTest.aObject, function() { iTest++; })");

    iTest = 0; ES5.Array.prototype.forEach.call(oTest.afunction, function (item, idx, array) { iTest++; });
    equal(iTest, 0, "ES5.Array.prototype.forEach.call(oTest.afunction, function() { iTest++; })");
});
test("Array.prototype.forEachUntil", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    var iTest = 0;

    iTest = 0;
    equal(ES5.Array.prototype.forEachUntil.call(undefined, function (item, idx, array) { iTest++; return true; }), false, "ES5.Array.prototype.forEachUntil.call(undefined, function() { iTest++; return true; })");
    equal(iTest, 0, "ES5.Array.prototype.forEachUntil.call(undefined, function() { iTest++; return true; }); return iTest;");

    iTest = 0;
    equal(ES5.Array.prototype.forEachUntil.call(null, function (item, idx, array) { iTest++; return true; }), false, "ES5.Array.prototype.forEachUntil.call(null, function() { iTest++; return true; })");
    equal(iTest, 0, "ES5.Array.prototype.forEachUntil.call(null, function() { iTest++; return true; }); return iTest;");

    iTest = 0;
    equal(ES5.Array.prototype.forEachUntil.call([], function (item, idx, array) { iTest++; return true; }), false, "ES5.Array.prototype.forEachUntil.call([], function() { iTest++; return true; })");
    equal(iTest, 0, "ES5.Array.prototype.forEachUntil.call([], function() { iTest++; return true; }); return iTest;");

    iTest = 0;
    equal(ES5.Array.prototype.forEachUntil.call(oTest.aArray, function (item, idx, array) { iTest++; return iTest > 1; }), true, "ES5.Array.prototype.forEachUntil.call(oTest.aArray, function() { iTest++; return iTest > 1; })");
    equal(iTest, 2, "ES5.Array.prototype.forEachUntil.call(oTest.aArray, function() { iTest++; return iTest > 1; }); return iTest;");

    iTest = 0; ES5.Array.prototype.forEachUntil.call(oTest.aObject, function (item, idx, array) { iTest++; return false; });
    equal(iTest, 0, "ES5.Array.prototype.forEachUntil.call(oTest.aObject, function() { iTest++; return false; }); return iTest;");

    iTest = 0; ES5.Array.prototype.forEachUntil.call(oTest.afunction, function (item, idx, array) { iTest++; return false; });
    equal(iTest, 0, "ES5.Array.prototype.forEachUntil.call(oTest.afunction, function() { iTest++; return false; }); return iTest;");
});
test("Array.prototype.every", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    var iTest = 0;

    iTest = 0;
    equal(ES5.Array.prototype.every.call(undefined, function (item, idx, array) { iTest++; return false; }), true, "ES5.Array.prototype.every.call(undefined, function() { iTest++; return false; })");
    equal(iTest, 0, "ES5.Array.prototype.every.call(undefined, function() { iTest++; return false; }); return iTest;");

    iTest = 0;
    equal(ES5.Array.prototype.every.call(null, function (item, idx, array) { iTest++; return false; }), true, "ES5.Array.prototype.every.call(null, function() { iTest++; return false; })");
    equal(iTest, 0, "ES5.Array.prototype.every.call(null, function() { iTest++; return false; }); return iTest;");

    iTest = 0;
    equal(ES5.Array.prototype.every.call([], function (item, idx, array) { iTest++; return false; }), true, "ES5.Array.prototype.every.call([], function() { iTest++; return false; })");
    equal(iTest, 0, "ES5.Array.prototype.every.call([], function() { iTest++; return false; }); return iTest;");

    iTest = 0;
    equal(ES5.Array.prototype.every.call(oTest.aArray, function (item, idx, array) { iTest++; return iTest <= 1; }), false, "ES5.Array.prototype.every.call(oTest.aArray, function() { iTest++; return iTest <= 1; })");
    equal(iTest, 2, "ES5.Array.prototype.every.call(oTest.aArray, function() { iTest++; return iTest <= 1; }); return iTest;");

    iTest = 0; ES5.Array.prototype.every.call(oTest.aObject, function (item, idx, array) { iTest++; return true; });
    equal(iTest, 0, "ES5.Array.prototype.every.call(oTest.aObject, function() { iTest++; return true; }); return iTest;");

    iTest = 0; ES5.Array.prototype.every.call(oTest.afunction, function (item, idx, array) { iTest++; return true; });
    equal(iTest, 0, "ES5.Array.prototype.every.call(oTest.afunction, function() { iTest++; return true; }); return iTest;");
});
test("Array.prototype.indexOf (ES5)", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    equal(ES5.Array.prototype.indexOf.call(), (-1), "ES5.Array.prototype.indexOf.call()");
    equal(ES5.Array.prototype.indexOf.call(undefined, 99), (-1), "ES5.Array.prototype.indexOf.call(undefined, 99)");
    equal(ES5.Array.prototype.indexOf.call(null, 99), (-1), "ES5.Array.prototype.indexOf.call(null, 99)");
    equal(ES5.Array.prototype.indexOf.call(oTest, 99), (-1), "ES5.Array.prototype.indexOf.call(oTest, 99)");
    equal(ES5.Array.prototype.indexOf.call([], 99), (-1), "ES5.Array.prototype.indexOf.call([], 99)");
    equal(ES5.Array.prototype.indexOf.call({}, 99), (-1), "ES5.Array.prototype.indexOf.call({}, 99)");
    equal(ES5.Array.prototype.indexOf.call(oTest.aArray, 99), (-1), "ES5.Array.prototype.indexOf.call(oTest.aArray, 99)");
    equal(ES5.Array.prototype.indexOf.call(oTest.aArray, 3), 2, "ES5.Array.prototype.indexOf.call(oTest.aArray, 3)");
    equal(ES5.Array.prototype.indexOf.call(oTest.aArray, 2), 1, "ES5.Array.prototype.indexOf.call(oTest.aArray, 2)");
    equal(ES5.Array.prototype.indexOf.call(oTest.aArray, 1), 0, "ES5.Array.prototype.indexOf.call(oTest.aArray, 1)");
    equal(ES5.Array.prototype.indexOf.call(oTest.aArray, 0), (-1), "ES5.Array.prototype.indexOf.call(oTest.aArray, 0)");
});
test("Array.prototype.lastIndexOf (ES5)", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    equal(ES5.Array.prototype.lastIndexOf.call(), (-1), "ES5.Array.prototype.lastIndexOf.call()");
    equal(ES5.Array.prototype.lastIndexOf.call(undefined, 99), (-1), "ES5.Array.prototype.lastIndexOf.call(undefined, 99)");
    equal(ES5.Array.prototype.lastIndexOf.call(null, 99), (-1), "ES5.Array.prototype.lastIndexOf.call(null, 99)");
    equal(ES5.Array.prototype.lastIndexOf.call(oTest, 99), (-1), "ES5.Array.prototype.lastIndexOf.call(oTest, 99)");
    equal(ES5.Array.prototype.lastIndexOf.call([], 99), (-1), "ES5.Array.prototype.lastIndexOf.call([], 99)");
    equal(ES5.Array.prototype.lastIndexOf.call({}, 99), (-1), "ES5.Array.prototype.lastIndexOf.call({}, 99)");
    equal(ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 99), (-1), "ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 99)");
    equal(ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 3), 9, "ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 3)");
    equal(ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 2), 10, "ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 2)");
    equal(ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 1), 11, "ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 1)");
    equal(ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 0), (-1), "ES5.Array.prototype.lastIndexOf.call(oTest.aArray, 0)");
});
test("Array.prototype.reduce (ES5)", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    raises(function () { ES5.Array.prototype.reduce.call(undefined, function (result, item, idx, array) { return result + 1; }) }, "ES5.Array.prototype.reduce.call(undefined, function (result, item, idx, array) { return result + 1; }) should throw error.");
    equal(ES5.Array.prototype.reduce.call(undefined, function (result, item, idx, array) { return result + 1; }, 0), 0, "ES5.Array.prototype.reduce.call(undefined, function (result, item, idx, array) { return result + 1; }, 0)");
    equal(ES5.Array.prototype.reduce.call(null, function (result, item, idx, array) { return result + 1; }, 0), 0, "ES5.Array.prototype.reduce.call(null, function (result, item, idx, array) { return result + 1; }, 0)");
    equal(ES5.Array.prototype.reduce.call([], function (result, item, idx, array) { return result + 1; }, 0), 0, "ES5.Array.prototype.reduce.call([], function (result, item, idx, array) { return result + 1; }, 0)");
    equal(ES5.Array.prototype.reduce.call(oTest.aArray, function (result, item, idx, array) { return result + item; }, 0), 306, "ES5.Array.prototype.reduce.call(oTest.aArray, function (result, item, idx, array) { return result + item; }, 0)");
});
test("Array.prototype.filter (ES5)", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    equal(Array.isArray(ES5.Array.prototype.filter.call([], function (item, idx, array) { return true; })), true, "Array.isArray(ES5.Array.prototype.filter.call([], function (item, idx, array) { return true; }))");
    equal(ES5.Array.prototype.filter.call([], function (item, idx, array) { return true; }).length, 0, "ES5.Array.prototype.filter.call([], function (item, idx, array) { return true; }).length");
    equal(ES5.Array.prototype.filter.call(oTest.aArray, function (item, idx, array) { return true; }).length, 22, "ES5.Array.prototype.filter.call(oTest.aArray, function (item, idx, array) { return true; }).length");
    equal(ES5.Array.prototype.filter.call(oTest.aArray, function (item, idx, array) { return false; }).length, 0, "ES5.Array.prototype.filter.call(oTest.aArray, function (item, idx, array) { return false; }).length");
    equal(ES5.Array.prototype.filter.call(oTest.aArray, function (item, idx, array) { return item <= 9; }).length, 12, "ES5.Array.prototype.filter.call(oTest.aArray, function (item, idx, array) { return item <= 9; }).length");
    equal(ES5.Array.prototype.filter.call(oTest.aArray, function (item, idx, array) { return (item % 2) == 0; }).length, 10, "ES5.Array.prototype.filter.call(oTest.aArray, function (item, idx, array) { return (item % 2) == 0; }).length");
});
test("Array.prototype.peek", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    equal(ES5.Array.prototype.peek.call([]), undefined, "ES5.Array.prototype.peek.call([])");
    equal(ES5.Array.prototype.peek.call([], 999), 999, "ES5.Array.prototype.peek.call([], 999)");
    equal(ES5.Array.prototype.peek.call(oTest.aArray), 30, "ES5.Array.prototype.peek.call(oTest.aArray)");
    equal(ES5.Array.prototype.peek.call(oTest.aArray, 999), 30, "ES5.Array.prototype.peek.call(oTest.aArray, 999)");
});
test("Array.prototype.isEmpty", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    equal(ES5.Array.prototype.isEmpty.call([]), true, "ES5.Array.prototype.isEmpty.call([])");
    equal(ES5.Array.prototype.isEmpty.call([0]), false, "ES5.Array.prototype.isEmpty.call([0])");
    equal(ES5.Array.prototype.isEmpty.call(oTest.aArray), false, "ES5.Array.prototype.isEmpty.call(oTest.aArray)");
});
test("Array.isArray (ES5)", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    equal(ES5.Array.isArray(), false, "ES5.Array.isArray()");
    equal(ES5.Array.isArray(null), false, "ES5.Array.isArray(null)");
    equal(ES5.Array.isArray([]), true, "ES5.Array.isArray(null)");
    equal(ES5.Array.isArray({}), false, "ES5.Array.isArray({})");
    equal(ES5.Array.isArray(oTest.xxx), false, "ES5.Array.isArray(oTest.xxx)");
    equal(ES5.Array.isArray(oTest.something), false, "ES5.Array.isArray(oTest.something)");
    equal(ES5.Array.isArray(oTest), false, "ES5.Array.isArray(oTest)");
    equal(ES5.Array.isArray(oTest.aArray), true, "ES5.Array.isArray(oTest.aArray)");
    equal(ES5.Array.isArray(oTest.aObject), false, "ES5.Array.isArray(oTest.aObject)");
    equal(ES5.Array.isArray(oTest.afunction), false, "ES5.Array.isArray(oTest.afunction)");
});

//=================================================================================================
test("String.prototype.trim", function () {
    equal("".trim(), "", '"".trim()');
    equal("    ".trim(), "", '"    ".trim()');
    equal("abcd".trim(), "abcd", '"abcd".trim()');
    equal("this is a test".trim(), "this is a test", '"this is a test".trim()');
    equal("   this is a test".trim(), "this is a test", '"   this is a test".trim()');
    equal("this is a test   ".trim(), "this is a test", '"this is a test   ".trim()');
    equal("   this is a test   ".trim(), "this is a test", '"   this is a test   ".trim()');
});
test("String.prototype.ltrim", function () {
    equal("".ltrim(), "", '"".ltrim()');
    equal("    ".ltrim(), "", '"    ".ltrim()');
    equal("abcd".ltrim(), "abcd", '"abcd".ltrim()');
    equal("this is a test".ltrim(), "this is a test", '"this is a test".ltrim()');
    equal("   this is a test".ltrim(), "this is a test", '"   this is a test".ltrim()');
    equal("this is a test   ".ltrim(), "this is a test   ", '"this is a test   ".ltrim()');
    equal("   this is a test   ".ltrim(), "this is a test   ", '"   this is a test   ".ltrim()');
});
test("String.prototype.rtrim", function () {
    equal("".rtrim(), "", '"".rtrim()');
    equal("    ".rtrim(), "", '"    ".rtrim()');
    equal("abcd".rtrim(), "abcd", '"abcd".rtrim()');
    equal("this is a test".rtrim(), "this is a test", '"this is a test".rtrim()');
    equal("   this is a test".rtrim(), "   this is a test", '"   this is a test".rtrim()');
    equal("this is a test   ".rtrim(), "this is a test", '"this is a test   ".rtrim()');
    equal("   this is a test   ".rtrim(), "   this is a test", '"   this is a test   ".rtrim()');
});
test("String.prototype.contains", function () {
    equal("".contains(), false, '"".contains()');
    equal("".contains(null), false, '"".contains(null)');
    equal("".contains(""), true, '"".contains("")');
    equal("".contains("is"), false, '"".contains("is")');
    equal("    ".contains(""), true, '"    ".contains("")');
    equal("    ".contains("is"), false, '"    ".contains("is")');
    equal("abcd".contains(), false, '"abcd".contains()');
    equal("abcd".contains(null), false, '"abcd".contains(null)');
    equal("abcd".contains("is"), false, '"abcd".contains("is")');
    equal("abcd".contains("ab"), true, '"abcd".contains("ab")');
    equal("abcd".contains("cd"), true, '"abcd".contains("cd")');
    equal("abcd".contains("abcdefg"), false, '"abcd".contains("abcdefg")');
    equal("this is a test".contains("is"), true, '"this is a test".contains("is")');
    equal("this is a test".contains(" is "), true, '"this is a test".contains(" is ")');
});
test("String.prototype.startsWith", function () {
    equal("".startsWith(), false, '"".startsWith()');
    equal("".startsWith(null), false, '"".startsWith(null)');
    equal("".startsWith(""), true, '"".startsWith("")');
    equal("".startsWith("is"), false, '"".startsWith("is")');
    equal("    ".startsWith(""), true, '"    ".startsWith("")');
    equal("    ".startsWith("is"), false, '"    ".startsWith("is")');
    equal("    ".startsWith(" "), true, '"    ".startsWith(" ")');
    equal("abcd".startsWith(), false, '"abcd".startsWith()');
    equal("abcd".startsWith(null), false, '"abcd".startsWith(null)');
    equal("abcd".startsWith(""), true, '"abcd".startsWith("")');
    equal("abcd".startsWith("is"), false, '"abcd".startsWith("is")');
    equal("abcd".startsWith("ab"), true, '"abcd".startsWith("ab")');
    equal("abcd".startsWith("cd"), false, '"abcd".startsWith("cd")');
    equal("abcd".startsWith("abcdefg"), false, '"abcd".startsWith("abcdefg")');
    equal("this is a test".startsWith("is"), false, '"this is a test".startsWith("is")');
    equal("this is a test".startsWith(" is "), false, '"this is a test".startsWith(" is ")');
    equal("this is a test".startsWith("this"), true, '"this is a test".startsWith("this")');
    equal("this is a test".startsWith("test"), false, '"this is a test".startsWith("test")');
});
test("String.prototype.endsWith", function () {
    equal("".endsWith(), false, '"".endsWith()');
    equal("".endsWith(null), false, '"".endsWith(null)');
    equal("".endsWith(""), true, '"".endsWith("")');
    equal("".endsWith("is"), false, '"".endsWith("is")');
    equal("    ".endsWith(""), true, '"    ".endsWith("")');
    equal("    ".endsWith("is"), false, '"    ".endsWith("is")');
    equal("    ".endsWith(" "), true, '"    ".endsWith(" ")');
    equal("abcd".endsWith(), false, '"abcd".endsWith()');
    equal("abcd".endsWith(null), false, '"abcd".endsWith(null)');
    equal("abcd".endsWith(""), true, '"abcd".endsWith("")');
    equal("abcd".endsWith("is"), false, '"abcd".endsWith("is")');
    equal("abcd".endsWith("ab"), false, '"abcd".endsWith("ab")');
    equal("abcd".endsWith("cd"), true, '"abcd".endsWith("cd")');
    equal("abcd".endsWith("abcdefg"), false, '"abcd".endsWith("abcdefg")');
    equal("this is a test".endsWith("is"), false, '"this is a test".endsWith("is")');
    equal("this is a test".endsWith(" is "), false, '"this is a test".endsWith(" is ")');
    equal("this is a test".endsWith("this"), false, '"this is a test".endsWith("this")');
    equal("this is a test".endsWith("test"), true, '"this is a test".endsWith("test")');
});
test("String.prototype.removePrefix", function () {
    equal("".removePrefix(), "", '"".removePrefix()');
    equal("".removePrefix(null), "", '"".removePrefix(null)');
    equal("".removePrefix(""), "", '"".removePrefix("")');
    equal("".removePrefix("is"), "", '"".removePrefix("is")');
    equal("    ".removePrefix(""), "    ", '"    ".removePrefix("")');
    equal("    ".removePrefix("is"), "    ", '"    ".removePrefix("is")');
    equal("    ".removePrefix(" "), "   ", '"    ".removePrefix(" ")');
    equal("abcd".removePrefix(), "abcd", '"abcd".removePrefix()');
    equal("abcd".removePrefix(null), "abcd", '"abcd".removePrefix(null)');
    equal("abcd".removePrefix(""), "abcd", '"abcd".removePrefix("")');
    equal("abcd".removePrefix("is"), "abcd", '"abcd".removePrefix("is")');
    equal("abcd".removePrefix("ab"), "cd", '"abcd".removePrefix("ab")');
    equal("abcd".removePrefix("cd"), "abcd", '"abcd".removePrefix("cd")');
    equal("abcd".removePrefix("abcd"), "", '"abcd".removePrefix("abcd")');
    equal("abcd".removePrefix("abcdefg"), "abcd", '"abcd".removePrefix("abcdefg")');
    equal("this is a test".removePrefix("is"), "this is a test", '"this is a test".removePrefix("is")');
    equal("this is a test".removePrefix(" is "), "this is a test", '"this is a test".removePrefix(" is ")');
    equal("this is a test".removePrefix("this"), " is a test", '"this is a test".removePrefix("this")');
    equal("this is a test".removePrefix("test"), "this is a test", '"this is a test".removePrefix("test")');
});
test("String.prototype.removeSuffix", function () {
    equal("".removeSuffix(), "", '"".removeSuffix()');
    equal("".removeSuffix(null), "", '"".removeSuffix(null)');
    equal("".removeSuffix(""), "", '"".removeSuffix("")');
    equal("".removeSuffix("is"), "", '"".removeSuffix("is")');
    equal("    ".removeSuffix(""), "    ", '"    ".removeSuffix("")');
    equal("    ".removeSuffix("is"), "    ", '"    ".removeSuffix("is")');
    equal("    ".removeSuffix(" "), "   ", '"    ".removeSuffix(" ")');
    equal("abcd".removeSuffix(), "abcd", '"abcd".removeSuffix()');
    equal("abcd".removeSuffix(null), "abcd", '"abcd".removeSuffix(null)');
    equal("abcd".removeSuffix(""), "abcd", '"abcd".removeSuffix("")');
    equal("abcd".removeSuffix("is"), "abcd", '"abcd".removeSuffix("is")');
    equal("abcd".removeSuffix("ab"), "abcd", '"abcd".removeSuffix("ab")');
    equal("abcd".removeSuffix("cd"), "ab", '"abcd".removeSuffix("cd")');
    equal("abcd".removeSuffix("abcd"), "", '"abcd".removeSuffix("abcd")');
    equal("abcd".removeSuffix("abcdefg"), "abcd", '"abcd".removeSuffix("abcdefg")');
    equal("this is a test".removeSuffix("is"), "this is a test", '"this is a test".removeSuffix("is")');
    equal("this is a test".removeSuffix(" is "), "this is a test", '"this is a test".removeSuffix(" is ")');
    equal("this is a test".removeSuffix("this"), "this is a test", '"this is a test".removeSuffix("this")');
    equal("this is a test".removeSuffix("test"), "this is a ", '"this is a test".removeSuffix("test")');
});
test("String.prototype.beforeFirst", function () {
    equal("".beforeFirst(), "", '"".beforeFirst()');
    equal("".beforeFirst(null), "", '"".beforeFirst(null)');
    equal("".beforeFirst(""), "", '"".beforeFirst("")');
    equal("".beforeFirst("is"), "", '"".beforeFirst("is")');
    equal("    ".beforeFirst(""), "", '"    ".beforeFirst("")');
    equal("    ".beforeFirst("is"), "    ", '"    ".beforeFirst("is")');
    equal("    ".beforeFirst(" "), "", '"    ".beforeFirst(" ")');
    equal("abcd".beforeFirst(), "abcd", '"abcd".beforeFirst()');
    equal("abcd".beforeFirst(null), "abcd", '"abcd".beforeFirst(null)');
    equal("abcd".beforeFirst(""), "", '"abcd".beforeFirst("")');
    equal("abcd".beforeFirst("is"), "abcd", '"abcd".beforeFirst("is")');
    equal("abcd".beforeFirst("ab"), "", '"abcd".beforeFirst("ab")');
    equal("abcd".beforeFirst("cd"), "ab", '"abcd".beforeFirst("cd")');
    equal("abcd".beforeFirst("abcd"), "", '"abcd".beforeFirst("abcd")');
    equal("abcd".beforeFirst("abcdefg"), "abcd", '"abcd".beforeFirst("abcdefg")');
    equal("this is a test".beforeFirst("is"), "th", '"this is a test".beforeFirst("is")');
    equal("this is a test".beforeFirst(" "), "this", '"this is a test".beforeFirst(" ")');
    equal("this is a test".beforeFirst(" is "), "this", '"this is a test".beforeFirst(" is ")');
    equal("this is a test".beforeFirst("this"), "", '"this is a test".beforeFirst("this")');
    equal("this is a test".beforeFirst("test"), "this is a ", '"this is a test".beforeFirst("test")');
    equal("this is a test".beforeFirst("xxxx"), "this is a test", '"this is a test".beforeFirst("xxxx")');

    equal("".beforeFirst(null, null), null, '"".beforeFirst(null, "default")');
    equal("".beforeFirst(null, "default"), "default", '"".beforeFirst(null, "default")');
    equal("".beforeFirst("", "default"), "", '"".beforeFirst("", "default")');
    equal("".beforeFirst("is", null), null, '"".beforeFirst("is", "default")');
    equal("".beforeFirst("is", "default"), "default", '"".beforeFirst("is", "default")');
    equal("    ".beforeFirst("", "default"), "", '"    ".beforeFirst("", "default")');
    equal("    ".beforeFirst("is", "default"), "default", '"    ".beforeFirst("is", "default")');
    equal("    ".beforeFirst(" ", "default"), "", '"    ".beforeFirst(" ", "default")');
    equal("abcd".beforeFirst(null, "default"), "default", '"abcd".beforeFirst(null, "default")');
    equal("abcd".beforeFirst("", "default"), "", '"abcd".beforeFirst("", "default")');
    equal("abcd".beforeFirst("is", "default"), "default", '"abcd".beforeFirst("is", "default")');
    equal("abcd".beforeFirst("ab", "default"), "", '"abcd".beforeFirst("ab", "default")');
    equal("abcd".beforeFirst("cd", "default"), "ab", '"abcd".beforeFirst("cd", "default")');
    equal("abcd".beforeFirst("abcd", "default"), "", '"abcd".beforeFirst("abcd", "default")');
    equal("abcd".beforeFirst("abcdefg", "default"), "default", '"abcd".beforeFirst("abcdefg", "default")');
    equal("this is a test".beforeFirst("is", "default"), "th", '"this is a test".beforeFirst("is", "default")');
    equal("this is a test".beforeFirst(" ", "default"), "this", '"this is a test".beforeFirst(" ", "default")');
    equal("this is a test".beforeFirst(" is ", "default"), "this", '"this is a test".beforeFirst(" is ", "default")');
    equal("this is a test".beforeFirst("this", "default"), "", '"this is a test".beforeFirst("this", "default")');
    equal("this is a test".beforeFirst("test", "default"), "this is a ", '"this is a test".beforeFirst("test", "default")');
    equal("this is a test".beforeFirst("xxxx", "default"), "default", '"this is a test".beforeFirst("xxxx", "default")');
});
test("String.prototype.afterFirst", function () {
    equal("".afterFirst(), "", '"".afterFirst()');
    equal("".afterFirst(null), "", '"".afterFirst(null)');
    equal("".afterFirst(""), "", '"".afterFirst("")');
    equal("".afterFirst("is"), "", '"".afterFirst("is")');
    equal("    ".afterFirst(""), "    ", '"    ".afterFirst("")');
    equal("    ".afterFirst("is"), "    ", '"    ".afterFirst("is")');
    equal("    ".afterFirst(" "), "   ", '"    ".afterFirst(" ")');
    equal("abcd".afterFirst(), "abcd", '"abcd".afterFirst()');
    equal("abcd".afterFirst(null), "abcd", '"abcd".afterFirst(null)');
    equal("abcd".afterFirst(""), "abcd", '"abcd".afterFirst("")');
    equal("abcd".afterFirst("is"), "abcd", '"abcd".afterFirst("is")');
    equal("abcd".afterFirst("ab"), "cd", '"abcd".afterFirst("ab")');
    equal("abcd".afterFirst("cd"), "", '"abcd".afterFirst("cd")');
    equal("abcd".afterFirst("abcd"), "", '"abcd".afterFirst("abcd")');
    equal("abcd".afterFirst("abcdefg"), "abcd", '"abcd".afterFirst("abcdefg")');
    equal("this is a test".afterFirst("is"), " is a test", '"this is a test".afterFirst("is")');
    equal("this is a test".afterFirst(" "), "is a test", '"this is a test".afterFirst(" ")');
    equal("this is a test".afterFirst(" is "), "a test", '"this is a test".afterFirst(" is ")');
    equal("this is a test".afterFirst("this"), " is a test", '"this is a test".afterFirst("this")');
    equal("this is a test".afterFirst("test"), "", '"this is a test".afterFirst("test")');
    equal("this is a test".afterFirst("xxxx"), "this is a test", '"this is a test".afterFirst("xxxx")');

    equal("".afterFirst(null, null), null, '"".afterFirst(null, "default")');
    equal("".afterFirst(null, "default"), "default", '"".afterFirst(null, "default")');
    equal("".afterFirst("", "default"), "", '"".afterFirst("", "default")');
    equal("".afterFirst("is", null), null, '"".afterFirst("is", "default")');
    equal("".afterFirst("is", "default"), "default", '"".afterFirst("is", "default")');
    equal("    ".afterFirst("", "default"), "    ", '"    ".afterFirst("", "default")');
    equal("    ".afterFirst("is", "default"), "default", '"    ".afterFirst("is", "default")');
    equal("    ".afterFirst(" ", "default"), "   ", '"    ".afterFirst(" ", "default")');
    equal("abcd".afterFirst(null, "default"), "default", '"abcd".afterFirst(null, "default")');
    equal("abcd".afterFirst("", "default"), "abcd", '"abcd".afterFirst("", "default")');
    equal("abcd".afterFirst("is", "default"), "default", '"abcd".afterFirst("is", "default")');
    equal("abcd".afterFirst("ab", "default"), "cd", '"abcd".afterFirst("ab", "default")');
    equal("abcd".afterFirst("cd", "default"), "", '"abcd".afterFirst("cd", "default")');
    equal("abcd".afterFirst("abcd", "default"), "", '"abcd".afterFirst("abcd", "default")');
    equal("abcd".afterFirst("abcdefg", "default"), "default", '"abcd".afterFirst("abcdefg", "default")');
    equal("this is a test".afterFirst("is", "default"), " is a test", '"this is a test".afterFirst("is", "default")');
    equal("this is a test".afterFirst(" ", "default"), "is a test", '"this is a test".afterFirst(" ", "default")');
    equal("this is a test".afterFirst(" is ", "default"), "a test", '"this is a test".afterFirst(" is ", "default")');
    equal("this is a test".afterFirst("this", "default"), " is a test", '"this is a test".afterFirst("this", "default")');
    equal("this is a test".afterFirst("test", "default"), "", '"this is a test".afterFirst("test", "default")');
    equal("this is a test".afterFirst("xxxx", "default"), "default", '"this is a test".afterFirst("xxxx", "default")');
});
test("String.prototype.beforeLast", function () {
    equal("".beforeLast(), "", '"".beforeLast()');
    equal("".beforeLast(null), "", '"".beforeLast(null)');
    equal("".beforeLast(""), "", '"".beforeLast("")');
    equal("".beforeLast("is"), "", '"".beforeLast("is")');
    equal("    ".beforeLast(""), "    ", '"    ".beforeLast("")');
    equal("    ".beforeLast("is"), "    ", '"    ".beforeLast("is")');
    equal("    ".beforeLast(" "), "   ", '"    ".beforeLast(" ")');
    equal("abcd".beforeLast(), "abcd", '"abcd".beforeLast()');
    equal("abcd".beforeLast(null), "abcd", '"abcd".beforeLast(null)');
    equal("abcd".beforeLast(""), "abcd", '"abcd".beforeLast("")');
    equal("abcd".beforeLast("is"), "abcd", '"abcd".beforeLast("is")');
    equal("abcd".beforeLast("ab"), "", '"abcd".beforeLast("ab")');
    equal("abcd".beforeLast("cd"), "ab", '"abcd".beforeLast("cd")');
    equal("abcd".beforeLast("abcd"), "", '"abcd".beforeLast("abcd")');
    equal("abcd".beforeLast("abcdefg"), "abcd", '"abcd".beforeLast("abcdefg")');
    equal("this is a test".beforeLast("is"), "this ", '"this is a test".beforeLast("is")');
    equal("this is a test".beforeLast(" "), "this is a", '"this is a test".beforeLast(" ")');
    equal("this is a test".beforeLast(" is "), "this", '"this is a test".beforeLast(" is ")');
    equal("this is a test".beforeLast("this"), "", '"this is a test".beforeLast("this")');
    equal("this is a test".beforeLast("test"), "this is a ", '"this is a test".beforeLast("test")');
    equal("this is a test".beforeLast("xxxx"), "this is a test", '"this is a test".beforeLast("xxxx")');

    equal("".beforeLast(null, null), null, '"".beforeLast(null, "default")');
    equal("".beforeLast(null, "default"), "default", '"".beforeLast(null, "default")');
    equal("".beforeLast("", "default"), "", '"".beforeLast("", "default")');
    equal("".beforeLast("is", null), null, '"".beforeLast("is", "default")');
    equal("".beforeLast("is", "default"), "default", '"".beforeLast("is", "default")');
    equal("    ".beforeLast("", "default"), "    ", '"    ".beforeLast("", "default")');
    equal("    ".beforeLast("is", "default"), "default", '"    ".beforeLast("is", "default")');
    equal("    ".beforeLast(" ", "default"), "   ", '"    ".beforeLast(" ", "default")');
    equal("abcd".beforeLast(null, "default"), "default", '"abcd".beforeLast(null, "default")');
    equal("abcd".beforeLast("", "default"), "abcd", '"abcd".beforeLast("", "default")');
    equal("abcd".beforeLast("is", "default"), "default", '"abcd".beforeLast("is", "default")');
    equal("abcd".beforeLast("ab", "default"), "", '"abcd".beforeLast("ab", "default")');
    equal("abcd".beforeLast("cd", "default"), "ab", '"abcd".beforeLast("cd", "default")');
    equal("abcd".beforeLast("abcd", "default"), "", '"abcd".beforeLast("abcd", "default")');
    equal("abcd".beforeLast("abcdefg", "default"), "default", '"abcd".beforeLast("abcdefg", "default")');
    equal("this is a test".beforeLast("is", "default"), "this ", '"this is a test".beforeLast("is", "default")');
    equal("this is a test".beforeLast(" ", "default"), "this is a", '"this is a test".beforeLast(" ", "default")');
    equal("this is a test".beforeLast(" is ", "default"), "this", '"this is a test".beforeLast(" is ", "default")');
    equal("this is a test".beforeLast("this", "default"), "", '"this is a test".beforeLast("this", "default")');
    equal("this is a test".beforeLast("test", "default"), "this is a ", '"this is a test".beforeLast("test", "default")');
    equal("this is a test".beforeLast("xxxx", "default"), "default", '"this is a test".beforeLast("xxxx", "default")');
});
test("String.prototype.afterLast", function () {
    equal("".afterLast(), "", '"".afterLast()');
    equal("".afterLast(null), "", '"".afterLast(null)');
    equal("".afterLast(""), "", '"".afterLast("")');
    equal("".afterLast("is"), "", '"".afterLast("is")');
    equal("    ".afterLast(""), "", '"    ".afterLast("")');
    equal("    ".afterLast("is"), "    ", '"    ".afterLast("is")');
    equal("    ".afterLast(" "), "", '"    ".afterLast(" ")');
    equal("abcd".afterLast(), "abcd", '"abcd".afterLast()');
    equal("abcd".afterLast(null), "abcd", '"abcd".afterLast(null)');
    equal("abcd".afterLast(""), "", '"abcd".afterLast("")');
    equal("abcd".afterLast("is"), "abcd", '"abcd".afterLast("is")');
    equal("abcd".afterLast("ab"), "cd", '"abcd".afterLast("ab")');
    equal("abcd".afterLast("cd"), "", '"abcd".afterLast("cd")');
    equal("abcd".afterLast("abcd"), "", '"abcd".afterLast("abcd")');
    equal("abcd".afterLast("abcdefg"), "abcd", '"abcd".afterLast("abcdefg")');
    equal("this is a test".afterLast("is"), " a test", '"this is a test".afterLast("is")');
    equal("this is a test".afterLast(" "), "test", '"this is a test".afterLast(" ")');
    equal("this is a test".afterLast(" is "), "a test", '"this is a test".afterLast(" is ")');
    equal("this is a test".afterLast("this"), " is a test", '"this is a test".afterLast("this")');
    equal("this is a test".afterLast("test"), "", '"this is a test".afterLast("test")');
    equal("this is a test".afterLast("xxxx"), "this is a test", '"this is a test".afterLast("xxxx")');

    equal("".afterLast(null, null), null, '"".afterLast(null, "default")');
    equal("".afterLast(null, "default"), "default", '"".afterLast(null, "default")');
    equal("".afterLast("", "default"), "", '"".afterLast("", "default")');
    equal("".afterLast("is", null), null, '"".afterLast("is", "default")');
    equal("".afterLast("is", "default"), "default", '"".afterLast("is", "default")');
    equal("    ".afterLast("", "default"), "", '"    ".afterLast("", "default")');
    equal("    ".afterLast("is", "default"), "default", '"    ".afterLast("is", "default")');
    equal("    ".afterLast(" ", "default"), "", '"    ".afterLast(" ", "default")');
    equal("abcd".afterLast(null, "default"), "default", '"abcd".afterLast(null, "default")');
    equal("abcd".afterLast("", "default"), "", '"abcd".afterLast("", "default")');
    equal("abcd".afterLast("is", "default"), "default", '"abcd".afterLast("is", "default")');
    equal("abcd".afterLast("ab", "default"), "cd", '"abcd".afterLast("ab", "default")');
    equal("abcd".afterLast("cd", "default"), "", '"abcd".afterLast("cd", "default")');
    equal("abcd".afterLast("abcd", "default"), "", '"abcd".afterLast("abcd", "default")');
    equal("abcd".afterLast("abcdefg", "default"), "default", '"abcd".afterLast("abcdefg", "default")');
    equal("this is a test".afterLast("is", "default"), " a test", '"this is a test".afterLast("is", "default")');
    equal("this is a test".afterLast(" ", "default"), "test", '"this is a test".afterLast(" ", "default")');
    equal("this is a test".afterLast(" is ", "default"), "a test", '"this is a test".afterLast(" is ", "default")');
    equal("this is a test".afterLast("this", "default"), " is a test", '"this is a test".afterLast("this", "default")');
    equal("this is a test".afterLast("test", "default"), "", '"this is a test".afterLast("test", "default")');
    equal("this is a test".afterLast("xxxx", "default"), "default", '"this is a test".afterLast("xxxx", "default")');
});

//=================================================================================================
// JQuery utilities.
test("$.isDefined", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.isDefined(), false, "$.isDefined()");
    equal($.isDefined(undefined), false, "$.isDefined(undefined)");
    equal($.isDefined(null), true, "$.isDefined(null)");
    equal($.isDefined([]), true, "$.isDefined([])");
    equal($.isDefined({}), true, "$.isDefined({})");
    equal($.isDefined(oTest.xxx), false, "$.isDefined(oTest.xxx)");
    equal($.isDefined(oTest.something), true, "$.isDefined(oTest.something)");
    equal($.isDefined(oTest.aArray), true, "$.isDefined(oTest.aArray)");
    equal($.isDefined(oTest.aObject), true, "$.isDefined(oTest.aObject)");
    equal($.isDefined(oTest.afunction), true, "$.isDefined(oTest.afunction)");
});
test("$.isUndefined", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.isUndefined(), true, "$.isUndefined()");
    equal($.isUndefined(undefined), true, "$.isUndefined(undefined)");
    equal($.isUndefined(null), false, "$.isUndefined(null)");
    equal($.isUndefined([]), false, "$.isUndefined([])");
    equal($.isUndefined({}), false, "$.isUndefined({})");
    equal($.isUndefined(oTest.xxx), true, "$.isUndefined(oTest.xxx)");
    equal($.isUndefined(oTest.something), false, "$.isUndefined(oTest.something)");
    equal($.isUndefined(oTest.aArray), false, "$.isUndefined(oTest.aArray)");
    equal($.isUndefined(oTest.aObject), false, "$.isUndefined(oTest.aObject)");
    equal($.isUndefined(oTest.afunction), false, "$.isUndefined(oTest.afunction)");
});
test("$.isNothing", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.isNothing(), true, "$.isNothing()");
    equal($.isNothing(undefined), true, "$.isNothing(undefined)");
    equal($.isNothing(null), true, "$.isNothing(null)");
    equal($.isNothing([]), false, "$.isNothing([])");
    equal($.isNothing({}), false, "$.isNothing({})");
    equal($.isNothing(oTest.xxx), true, "$.isNothing(oTest.xxx)");
    equal($.isNothing(oTest.something), false, "$.isNothing(oTest.something)");
    equal($.isNothing(oTest.aArray), false, "$.isNothing(oTest.aArray)");
    equal($.isNothing(oTest.aObject), false, "$.isNothing(oTest.aObject)");
    equal($.isNothing(oTest.afunction), false, "$.isNothing(oTest.afunction)");
});
test("$.isObject", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.isObject(), false, "$.isObject()");
    equal($.isObject(undefined), false, "$.isObject(undefined)");
    equal($.isObject(null), false, "$.isObject(null)");
    equal($.isObject([]), false, "$.isObject([])");
    equal($.isObject({}), true, "$.isObject({})");
    equal($.isObject(oTest.xxx), false, "$.isObject(oTest.xxx)");
    equal($.isObject(oTest.something), false, "$.isObject(oTest.something)");
    equal($.isObject(oTest), true, "$.isObject(oTest)");
    equal($.isObject(oTest.aArray), false, "$.isObject(oTest.aArray)");
    equal($.isObject(oTest.aObject), true, "$.isObject(oTest.aObject)");
    equal($.isObject(oTest.afunction), false, "$.isObject(oTest.afunction)");
});
test("$.isFunction", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.isFunction(), false, "$.isFunction()");
    equal($.isFunction(undefined), false, "$.isFunction(undefined)");
    equal($.isFunction(null), false, "$.isFunction(null)");
    equal($.isFunction([]), false, "$.isFunction([])");
    equal($.isFunction({}), false, "$.isFunction({})");
    equal($.isFunction(oTest.xxx), false, "$.isFunction(oTest.xxx)");
    equal($.isFunction(oTest.something), false, "$.isFunction(oTest.something)");
    equal($.isFunction(oTest), false, "$.isFunction(oTest)");
    equal($.isFunction(oTest.aArray), false, "$.isFunction(oTest.aArray)");
    equal($.isFunction(oTest.aObject), false, "$.isFunction(oTest.aObject)");
    equal($.isFunction(oTest.afunction), true, "$.isFunction(oTest.afunction)");
});
test("$.isArray", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.isArray(), false, "$.isArray()");
    equal($.isArray(undefined), false, "$.isArray(undefined)");
    equal($.isArray(null), false, "$.isArray(null)");
    equal($.isArray([]), true, "$.isArray(null)");
    equal($.isArray({}), false, "$.isArray({})");
    equal($.isArray(oTest.xxx), false, "$.isArray(oTest.xxx)");
    equal($.isArray(oTest.something), false, "$.isArray(oTest.something)");
    equal($.isArray(oTest), false, "$.isArray(oTest)");
    equal($.isArray(oTest.aArray), true, "$.isArray(oTest.aArray)");
    equal($.isArray(oTest.aObject), false, "$.isArray(oTest.aObject)");
    equal($.isArray(oTest.afunction), false, "$.isArray(oTest.afunction)");
});
test("$.isString", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.isString(), false, "$.isString()");
    equal($.isString(undefined), false, "$.isString(undefined)");
    equal($.isString(null), false, "$.isString(null)");
    equal($.isString([]), false, "$.isString([])");
    equal($.isString({}), false, "$.isString({})");
    equal($.isString(""), true, '$.isString("")');
    equal($.isString(oTest), false, "$.isString(oTest)");
    equal($.isString(oTest.xxx), false, "$.isString(oTest.xxx)");
    equal($.isString(oTest.something), true, "$.isString(oTest.something)");
    equal($.isString(oTest.aArray), false, "$.isString(oTest.aArray)");
    equal($.isString(oTest.aObject), false, "$.isString(oTest.aObject)");
    equal($.isString(oTest.afunction), false, "$.isString(oTest.afunction)");
});
test("$.isNumeric", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.isNumeric(), false, "$.isNumeric()");
    equal($.isNumeric(undefined), false, "$.isNumeric(undefined)");
    equal($.isNumeric(null), false, "$.isNumeric(null)");
    equal($.isNumeric([]), false, "$.isNumeric(null)");
    equal($.isNumeric({}), false, "$.isNumeric({})");
    equal($.isNumeric(""), false, '$.isNumeric("")');
    equal($.isNumeric(" -.1"), true, '$.isNumeric(" -.1")');
    equal($.isNumeric(" -.-1"), false, '$.isNumeric(" -.-1")');
    equal($.isNumeric(0.1), true, '$.isNumeric(0.1)');
    equal($.isNumeric(oTest.xxx), false, "$.isNumeric(oTest.xxx)");
    equal($.isNumeric(oTest.something), false, "$.isNumeric(oTest.something)");
    equal($.isNumeric(oTest), false, "$.isNumeric(oTest)");
    equal($.isNumeric(oTest.aArray), false, "$.isNumeric(oTest.aArray)");
    equal($.isNumeric(oTest.aObject), false, "$.isNumeric(oTest.aObject)");
    equal($.isNumeric(oTest.afunction), false, "$.isNumeric(oTest.afunction)");
});
test("$.isBlank", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.isBlank(), true, "$.isBlank()");
    equal($.isBlank(undefined), true, "$.isBlank(undefined)");
    equal($.isBlank(null), true, "$.isBlank(null)");
    equal($.isBlank([]), false, "$.isBlank([])");
    equal($.isBlank({}), false, "$.isBlank({})");
    equal($.isBlank(""), true, '$.isBlank("")');
    equal($.isBlank("  "), true, '$.isBlank("  ")');
    equal($.isBlank(null, true), true, "$.isBlank(null, true)");
    equal($.isBlank([], true), false, "$.isBlank(null, true)");
    equal($.isBlank({}, true), false, "$.isBlank({}, true)");
    equal($.isBlank("", true), true, '$.isBlank("", true)');
    equal($.isBlank("  ", true), true, '$.isBlank("  ", true)');
    equal($.isBlank(null, false), true, "$.isBlank(null, false)");
    equal($.isBlank([], false), false, "$.isBlank(null, false)");
    equal($.isBlank({}, false), false, "$.isBlank({}, false)");
    equal($.isBlank("", false), true, '$.isBlank("", false)');
    equal($.isBlank("  ", false), false, '$.isBlank("  ", false)');
    equal($.isBlank(oTest), false, "$.isBlank(oTest)");
    equal($.isBlank(oTest.xxx), true, "$.isBlank(oTest.xxx)");
    equal($.isBlank(oTest.something), false, "$.isBlank(oTest.something)");
    equal($.isBlank(oTest.aArray), false, "$.isBlank(oTest.aArray)");
    equal($.isBlank(oTest.aObject), false, "$.isBlank(oTest.aObject)");
    equal($.isBlank(oTest.afunction), false, "$.isBlank(oTest.afunction)");
});
test("$.asString", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.asString(), undefined, "$.asString()");
    equal($.asString(undefined), undefined, "$.asString(undefined)");
    equal($.asString(undefined, null), null, "$.asString(undefined, null)");
    equal($.asString(null, undefined), undefined, "$.asString(null, undefined)");
    equal($.asString(null, null), null, "$.asString(null, null)");
    equal($.asString(null, "xxx"), "xxx", '$.asString(null, "xxx")');
    equal($.asString(-.1, "xxx"), "-0.1", '$.asString(-.1, "xxx")');
    equal($.asString(0, "xxx"), "0", '$.asString(0, "xxx")');
    equal($.asString(true, "xxx"), "true", '$.asString(true, "xxx")');
    equal($.asString(false, "xxx"), "false", '$.asString(false, "xxx")');
    equal($.asString(oTest.xxx, "xxx"), "xxx", '$.asString(oTest.xxx, "xxx")');
    equal($.asString(oTest.quoteTest, "xxx"), 'a "test" for quote\'s', '$.asString(oTest.quoteTest, "xxx")');
});
test("$.asInt", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.asInt(), undefined, '$.asInt()');
    equal($.asInt(undefined), undefined, '$.asInt(undefined)');
    equal($.asInt(null), undefined, '$.asInt(null)');
    equal($.asInt(null, 99), 99, '$.asInt(null, 99)');
    equal($.asInt([], 99), 99, '$.asInt([], 99)');
    equal($.asInt({}, 99), 99, '$.asInt({}, 99)');
    equal($.asInt("", 99), 99, '$.asInt("", 99)');
    equal($.asInt("xxx", 99), 99, '$.asInt("xxx", 99)');
    equal($.asInt(0), 0, '$.asInt(0)');
    equal($.asInt(0, 99), 0, '$.asInt(0, 99)');
    equal($.asInt(42, 99), 42, '$.asInt(0, 99)');
    equal($.asInt(-42, 99), -42, '$.asInt(0, 99)');
    equal($.asInt("0", 99), 0, '$.asInt("0", 99)');
    equal($.asInt("-.1", 99), 0, '$.asInt("-.1", 99)');
    equal($.asInt("42", 99), 42, '$.asInt("42", 99)');
    equal($.asInt("-42", 99), -42, '$.asInt("-42", 99)');
    equal($.asInt("0x", 99), 0, '$.asInt("0x", 99)');
    equal($.asInt("-.1x", 99), 0, '$.asInt("-.1x", 99)');
    equal($.asInt("42x", 99), 42, '$.asInt("42x", 99)');
    equal($.asInt("-42x", 99), -42, '$.asInt("-42x", 99)');
    equal($.asInt("x0", 99), 99, '$.asInt("x0", 99)');
    equal($.asInt("x-.1", 99), 99, '$.asInt("x-.1", 99)');
    equal($.asInt("x42", 99), 99, '$.asInt("x42", 99)');
    equal($.asInt("x-42", 99), 99, '$.asInt("x-42", 99)');
    equal($.asInt(oTest.xxx, 99), 99, '$.asInt(oTest.xxx, 99)');
    equal($.asInt(oTest.aArray, 99), 99, '$.asInt(oTest.aArray, 99)');
    equal($.asInt(oTest.aObject, 99), 99, '$.asInt(oTest.aObject, 99)');
});
test("$.asFloat", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.asFloat(), undefined, '$.asFloat()');
    equal($.asFloat(undefined), undefined, '$.asFloat(undefined)');
    equal($.asFloat(null), undefined, '$.asFloat(null)');
    equal($.asFloat(null, 99), 99, '$.asFloat(null, 99)');
    equal($.asFloat([], 99), 99, '$.asFloat([], 99)');
    equal($.asFloat({}, 99), 99, '$.asFloat({}, 99)');
    equal($.asFloat("", 99), 99, '$.asFloat("", 99)');
    equal($.asFloat("xxx", 99), 99, '$.asFloat("xxx", 99)');
    equal($.asFloat(0), 0, '$.asFloat(0)');
    equal($.asFloat(0, 99), 0, '$.asFloat(0, 99)');
    equal($.asFloat(42, 99), 42, '$.asFloat(0, 99)');
    equal($.asFloat(-42, 99), -42, '$.asFloat(0, 99)');
    equal($.asFloat("0", 99), 0, '$.asFloat("0", 99)');
    equal($.asFloat("-.1", 99), -0.1, '$.asFloat("-.1", 99)');
    equal($.asFloat("42", 99), 42, '$.asFloat("42", 99)');
    equal($.asFloat("-42", 99), -42, '$.asFloat("-42", 99)');
    equal($.asFloat("0x", 99), 0, '$.asFloat("0x", 99)');
    equal($.asFloat("-.1x", 99), -0.1, '$.asFloat("-.1x", 99)');
    equal($.asFloat("42x", 99), 42, '$.asFloat("42x", 99)');
    equal($.asFloat("-42x", 99), -42, '$.asFloat("-42x", 99)');
    equal($.asFloat("x0", 99), 99, '$.asFloat("x0", 99)');
    equal($.asFloat("x-.1", 99), 99, '$.asFloat("x-.1", 99)');
    equal($.asFloat("x42", 99), 99, '$.asFloat("x42", 99)');
    equal($.asFloat("x-42", 99), 99, '$.asFloat("x-42", 99)');
    equal($.asFloat(oTest.xxx, 99), 99, '$.asFloat(oTest.xxx, 99)');
    equal($.asFloat(oTest.aArray, 99), 99, '$.asFloat(oTest.aArray, 99)');
    equal($.asFloat(oTest.aObject, 99), 99, '$.asFloat(oTest.aObject, 99)');
});
test("$.asBool", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    equal($.asBool(), false, '$.asBool()');
    equal($.asBool(undefined), false, '$.asBool(undefined)');
    equal($.asBool(null), false, '$.asBool(null)');
    equal($.asBool(null, true), true, '$.asBool(null, true)');
    equal($.asBool(null, false), false, '$.asBool(null, false)');
    equal($.asBool(0), false, '$.asBool(0)');
    equal($.asBool(0, true), false, '$.asBool(0, true)');
    equal($.asBool(0, false), false, '$.asBool(0, false)');
    equal($.asBool([], true), true, '$.asBool([], true)');
    equal($.asBool([], false), false, '$.asBool([], false)');
    equal($.asBool({}, true), true, '$.asBool({}, true)');
    equal($.asBool({}, false), false, '$.asBool({}, false)');
    equal($.asBool(42, false), true, '$.asBool(0, false)');
    equal($.asBool(-42, false), true, '$.asBool(0, false)');
    equal($.asBool("", true), true, '$.asBool("", true)');
    equal($.asBool("", false), false, '$.asBool("", false)');
    equal($.asBool("xxx", true), true, '$.asBool("xxx", true)');
    equal($.asBool("xxx", false), false, '$.asBool("xxx", false)');
    equal($.asBool("0", true), false, '$.asBool("0", true)');
    equal($.asBool("0", false), false, '$.asBool("0", false)');
    equal($.asBool("-.1", false), false, '$.asBool("-.1", false)');
    equal($.asBool("42", false), true, '$.asBool("42", false)');
    equal($.asBool("-42", false), true, '$.asBool("-42", false)');
    equal($.asBool("0x", false), false, '$.asBool("0x", false)');
    equal($.asBool("-.1x", false), false, '$.asBool("-.1x", false)');
    equal($.asBool("42x", false), true, '$.asBool("42x", false)');
    equal($.asBool("-42x", false), true, '$.asBool("-42x", false)');
    equal($.asBool("x0", true), true, '$.asBool("x0", true)');
    equal($.asBool("x0", false), false, '$.asBool("x0", false)');
    equal($.asBool("x-.1", true), true, '$.asBool("x-.1", true)');
    equal($.asBool("x-.1", false), false, '$.asBool("x-.1", false)');
    equal($.asBool("x42", true), true, '$.asBool("x42", true)');
    equal($.asBool("x42", false), false, '$.asBool("x42", false)');
    equal($.asBool("x-42", true), true, '$.asBool("x-42", true)');
    equal($.asBool("x-42", false), false, '$.asBool("x-42", false)');

    equal($.asBool("Yes", true), true, '$.asBool("Yes", true)');
    equal($.asBool("Yes", false), true, '$.asBool("Yes", false)');
    equal($.asBool("No", true), false, '$.asBool("No", true)');
    equal($.asBool("No", false), false, '$.asBool("No", false)');

    equal($.asBool("true", true), true, '$.asBool("true", true)');
    equal($.asBool("true", false), true, '$.asBool("true", false)');
    equal($.asBool("false", true), false, '$.asBool("false", true)');
    equal($.asBool("false", false), false, '$.asBool("false", false)');

    equal($.asBool(oTest.xxx, true), true, '$.asBool(oTest.xxx, true)');
    equal($.asBool(oTest.xxx, false), false, '$.asBool(oTest.xxx, false)');
    equal($.asBool(oTest.something, true), true, '$.asBool(oTest.something, false)');
    equal($.asBool(oTest.something, false), false, '$.asBool(oTest.something, false)');
    equal($.asBool(oTest.aArray, true), true, '$.asBool(oTest.aArray, false)');
    equal($.asBool(oTest.aArray, false), false, '$.asBool(oTest.aArray, false)');
    equal($.asBool(oTest.aObject, true), true, '$.asBool(oTest.aObject, false)');
    equal($.asBool(oTest.aObject, false), false, '$.asBool(oTest.aObject, false)');
});
asyncTest("$.TimeStamp", function () {
    var iStart = $.TimeStamp();
    ok(0 < iStart, "iStart = $.TimeStamp(); return iStart > 0;");
    equal(iStart > 0, true, "iStart > 0")

    // Note: "setTimeout" does not have accurate timeout, so tollerance in test is design to compensate.
    setTimeout(function () {
        var iEnd = $.TimeStamp();
        equal(iStart <= (iEnd - 90), true, "setTimeout(iStart <= ($.TimeStamp()-90), 100) (iStart=" + iStart + ",iEnd=" + iEnd + ",diff=" + (iEnd - iStart) + ")");
        start();
    }, 100);
});
asyncTest("$.HasTimedOut", function () {
    var iStart = $.TimeStamp();
    ok(true, "iStart = $.TimeStamp()");

    var iEnd = $.TimeStamp();
    equal($.HasTimedOut(iStart, 100), false, "$.HasTimedOut(iStart, 100) (iStart=" + iStart + ",iEnd=" + iEnd + ",diff=" + (iEnd - iStart) + ")");

    // Note: "setTimeout" does not have accurate timeout, so tollerance in test is design to compensate.
    setTimeout(function () {
        var iEnd = $.TimeStamp();
        equal($.HasTimedOut(iStart, 99), true, "setTimeout($.HasTimedOut(iStart, 100), 200) (iStart=" + iStart + ",iEnd=" + iEnd + ",diff=" + (iEnd - iStart) + ")");
        start();
    }, 200);
});
test("$.parsedURL", function () {
    var o = $.parseURL("http://test/method?a=aval&b=t&c=3");

    ok(true, '$.parseURL("http://test/method?a=aval&b=t&c=3") == ' + $.JSONstringify(o));

    equal(o.a, "aval", '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).a');
    equal(o.b, "t", '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).b');
    equal(o.c, "3", '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).c');
    equal(o.d, undefined, '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).d');
    equal(o.asString("a", "(undef)"), "aval", '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asString("a", "(undef)")');
    equal(o.asBool("a", false), false, '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asBool("a", false)');
    equal(o.asInt("a", 0), 0, '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asInt("a", 0)');
    equal(o.asString("b", "(undef)"), "t", '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asString("b", "(undef)")');
    equal(o.asBool("b", false), true, '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asBool("b", false)');
    equal(o.asInt("b", 0), 0, '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asInt("b", 0)');
    equal(o.asString("c", "(undef)"), "3", '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asString("c", "(undef)")');
    equal(o.asBool("c", false), true, '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asBool("c", false)');
    equal(o.asInt("c", 0), 3, '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asInt("c", 0)');
    equal(o.asString("d", "(undef)"), "(undef)", '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asString("d", "(undef)")');
    equal(o.asBool("d", false), false, '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asBool("d", false)');
    equal(o.asInt("d", 0), 0, '(new $.parseURL("http://test/method?a=aval&b=bval&c=cval")).asInt("d", 0)');
});
test("$.NextID", function () {
    var id1 = $.NextID(), id2 = $.NextID();

    equal($.NextID() > 0, true, "$.NextID() > 0 (always > 0)");
    equal($.NextID() != $.NextID(), true, "$.NextID() != $.NextID()");
});
test("$.StringStringify", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));
    raises(function () { $.StringStringify(); }, "$.StringStringify() must throw error.");
    raises(function () { $.StringStringify(undefined); }, "$.StringStringify(undefined) must throw error.");
    raises(function () { $.StringStringify(null); }, "$.StringStringify(null) must throw error.");
    equal($.StringStringify(-.1), '"-0.1"', '$.StringStringify(-.1, "xxx")');
    equal($.StringStringify(0), '"0"', '$.StringStringify(0, "xxx")');
    equal($.StringStringify(true), '"true"', '$.StringStringify(true, "xxx")');
    equal($.StringStringify(false), '"false"', '$.StringStringify(false, "xxx")');
    raises(function () { $.StringStringify(oTest.xxx); }, "$.StringStringify(oTest.xxx) must throw error.");
    equal($.StringStringify(oTest.quoteTest), '"a \\"test\\" for quote\'s"', "$.JSONstringify(oTest.quoteTest)")
});

function test_JSON(oVal, sArg) {
    var sVal1 = $.JSONstringify(oVal);
    var oVal2 = $.JSONparse(sVal1);
    var sVal2 = $.JSONstringify(oVal2);

    equal(sVal1, sVal2, "$.JSONparse($.JSONstringify(" + sArg + ")");
}
test("$.JSONstringify and $.JSONparse", function () {
    ok(true, "var oTest = " + $.JSONstringify(oTest));

    test_JSON(null, "null");
    test_JSON({}, "{}");
    test_JSON({ test: "data" }, '{ test: "data" }');
    test_JSON(oTest, "oTest");
    test_JSON(oTest.aArray, "oTest.aArray");

    equal($.JSONstringify(), "undefined", "$.JSONstringify()")
    equal($.JSONstringify(null), "null", "$.JSONstringify(null)")
    equal($.JSONstringify(oTest.something), '"xxx"', "$.JSONstringify(oTest.something)")
    equal($.JSONstringify(oTest.quoteTest), '"a \\"test\\" for quote\'s"', "$.JSONstringify(oTest.quoteTest)")
    equal($.JSONstringify(oTest.afunction), "function () { }", "$.JSONstringify(oTest.afunction)")

    equal($.JSONparse(null), null, "$.JSONparse(null)")
    equal($.JSONparse(''), null, "$.JSONparse('')")
    equal($.JSONparse('null'), null, "$.JSONparse('null')")
    raises(function () { $.JSONparse('this is bad JSON'); }, "JSONparse('this is bad JSON') must throw error.");
});
test("$.Dictionary", function () {
    var dict = new $.Dictionary();

    equal(dict.add("test1", oTest).length, 1, 'dict.add("test1", oTest).length');
    equal(dict.list("test1")[0], oTest, 'dict.list("test1").length');
    equal(dict.add("test1", oTest).length, 1, 'dict.add("test1", oTest).length');
    equal(dict.add("test1", oTest).length, 1, 'dict.add("test1", oTest).length');

    equal(dict.add("test2", oTest).length, 2, 'dict.add("test2", oTest).length');
    equal(dict.add("test2", oTest.aObject).length, 2, 'dict.add("test2", oTest.aObject).length');
    equal(dict.add("test2", oTest.something).length, 2, 'dict.add("test2", oTest.something).length');

    equal(dict.list("test1").length, 1, 'dict.list("test1").length');
    equal(dict.list("test2").length, 3, 'dict.list("test2").length');
    equal(dict.list("test3").length, 0, 'dict.list("test3").length');

    equal(dict.containsKey("test1"), true, 'dict.containsKey("test1")');
    equal(dict.containsKey("test3"), false, 'dict.containsKey("test3")');

    var aTest1 = null, aTest2 = null, aTest3 = null;
    dict.each(function (sKey, aList) {
        switch (sKey) {
            case "test1":
                equal(aList.length, 1, 'dict.each(...skey="test1", aList.length)');
                break;
            case "test2":
                equal(aList.length, 3, 'dict.each(...skey="test2", aList.length)');
                break;
            default:
                ok(false, "Unknown key '" & sKey & "'.");
                break;
        }
    });

    equal(dict.eachUntil(function (sKey, aList) { return sKey == "test2"; }), true, 'dict.eachUntil(function (sKey, aList) { return sKey == "test2"; })');
    equal(dict.eachUntil(function (sKey, aList) { return sKey == "test3"; }), false, 'dict.eachUntil(function (sKey, aList) { return sKey == "test3"; })');

    equal(dict.remove("test1", oTest).length, 1, 'dict.remove("test1", oTest).length');
    equal(dict.list("test1").length, 0, 'dict.list("test1").length');

    equal(dict.remove("test2", oTest.something).length, 1, 'dict.remove("test2", oTest.something).length');
    equal(dict.list("test2").length, 2, 'dict.list("test2").length');

    dict.remove("test3");
    equal(dict.remove("test3").length, 1, 'dict.remove("test3").length');

    dict.remove("test2");
    equal(dict.length, 0, 'dict.list("test2").length');
});
asyncTest("$.EventLocker", function () {
    var olock = new $.EventLocker(500);

    equal(olock.isLocked(), false, "olock.isLocked()");
    equal(olock.isLocked(1000), false, "olock.isLocked(1000)");
    equal(olock.isLocked(-10), false, "olock.isLocked(-10)");
    equal(olock.setLock(), true, "olock.setLock()");
    equal(olock.setLock(1000), false, "olock.setLock(1000)");
    equal(olock.setLock(0), false, "olock.setLock(0)");
    equal(olock.isLocked(), true, "olock.isLocked()");
    equal(olock.isLocked(1000), true, "olock.isLocked(1000)");
    equal(olock.isLocked(-10), false, "olock.isLocked(-10)");
    equal(olock.unlock(), true, "olock.unlock()");
    equal(olock.isLocked(), false, "olock.isLocked()");
    equal(olock.setLock(), true, "olock.setLock()");
    setTimeout(function () {
        equal(olock.isLocked(), true, "olock.isLocked() after timeout=100");
        equal(olock.setLock(), false, "olock.setLock() after timeout=100");
        start();
    }, 100);
    setTimeout(function () {
        equal(olock.isLocked(), false, "olock.isLocked() after timeout=600");
        equal(olock.setLock(), true, "olock.setLock() after timeout=600");
        start();
    }, 600);
    equal(olock.unlock(), true, "olock.unlock()");
    equal(olock.isLocked(), false, "olock.isLocked()");
    equal(olock.setLockForce(), true, "olock.setLock()");
    equal(olock.isLocked(), true, "olock.isLocked()");
});

//=================================================================================================
// JQuery extensions.
test("$.fn.firstItem", function () {
    var jqItems = $("ol#qunit-tests li");
    var oItem = jqItems[0];

    equal($().firstItem(), null, '$().firstItem()');
    equal($("ol#qunit-tests li").firstItem(), oItem, '$("ol#qunit-tests li").firstItem()');
    equal($("ol#qunit-tests li").firstItem().id, oItem.id, '$("ol#qunit-tests li").firstItem()');
    equal($("ol#qunit-tests li#dummy").firstItem(), null, '$("ol#qunit-tests li#dummy").firstItem()');
});
test("$.fn.lastItem", function () {
    var jqItems = $("ol#qunit-tests li");
    var oItem = jqItems[jqItems.length - 1];

    equal($().lastItem(), null, '$().lastItem()');
    equal($("ol#qunit-tests li").lastItem(), oItem, '$("ol#qunit-tests li").lastItem()');
    equal($("ol#qunit-tests li").lastItem().id, oItem.id, '$("ol#qunit-tests li").lastItem()');
    equal($("ol#qunit-tests li#dummy").lastItem(), null, '$("ol#qunit-tests li#dummy").lastItem()');
});
test("$.fn.isChecked", function () {
    var jqItems = $(":checkbox");
    var oItem = jqItems[0];

    equal($().isChecked(), false, '$().isChecked()');
    equal($(":checkbox").isChecked(), oItem.checked, '$(":checkbox").isChecked()');
});
test("$.fn.setChecked", function () {
    var jqItems = $(":checkbox:first");
    var oItem = jqItems[0];
    var bChecked = oItem.checked;

    equal($().setChecked(true).length, 0, '$().setChecked(true).length');
    equal($(":checkbox:first").setChecked(true).isChecked(), true, '$(":checkbox:first").setChecked(true).isChecked()');
    equal($(":checkbox:first").setChecked(false).isChecked(), false, '$(":checkbox:first").setChecked(false).isChecked()');
    equal($(":checkbox:first").setChecked(bChecked).isChecked(), bChecked, '$(":checkbox:first").setChecked(bChecked).isChecked()');
});
test("$.fn.tableSort", function () {
});
test("$.fn.layoutBox", function () {
});
test("$.fn.sizeControl", function () {
});
test("$.fn.emptyTextInput", function () {
});
test("$.fn.setFocus", function () {
});
test("$.fn.tocControl", function () {
    var sTest =
           "<div>"
             + "<ul>"
                 + "<li>item1</li>"
                 + "<li>item2"
                     + "<ul>"
                         + "<li>s1item1</li>"
                         + "<li>s1item2"
                         + "<ul>"
                             + "<li>s2item1</li>"
                             + "<li>s2item2"
                             + "</li>"
                             + "<li>s2item3</li>"
                             + "<li>s2item4</li>"
                         + "</ul>"
                         + "</li>"
                         + "<li>s1item3</li>"
                         + "<li>s1item4</li>"
                     + "</ul>"
                 + "</li>"
                 + "<li>item3</li>"
                 + "<li>item4</li>"
                 + "<li>item5</li>"
             + "</ul>"
         + "</div>";

    var jqTest = testSpace("$.fn.tocControl.test", sTest);
    jqTest.find("ul").tocControl();

    equal(jqTest.find("ul.ea-toc-control").length, 1, '$("jqTest.find("ul.ea-toc-control").length');
    equal(jqTest.find("ul:first").hasClass("ea-toc-control"), true, 'jqTest.find("ul:first").hasClass("ea-toc-control")');
    equal(jqTest.find("ul.ea-toc-control li.ea-toc-selected").length, 1, 'jqTest.find("ul.ea-toc-control li.ea-toc-selected").length');
    equal(jqTest.find("li:not(.ea-toc-open, .ea-toc-closed, .ea-toc-bullet)").length, 0, 'jqTest.find("li:not(.ea-toc-open, .ea-toc-closed, .ea-toc-bullet)").length');
});

$(function () {
    // Correct link definitions to files on local disk drive.
    setTimeout(function () {
        $("a[href^='/C:/']").each(function (idx) {
            $(this).attr("href", "file://" + $(this).attr("href"));
        });
    }, 500);
});
