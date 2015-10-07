/// <reference path="jquery-1.7.2-vsdoc.js" />
/// <reference path="jquery-ui-1.8.11.js" />
; "use strict";

/*
File:        jquery-easolutions-1.2.2.js
Version:     1.2.2
Description: General utilities
Author:      Michael Erickson, Erickson and Associates.
Created:     2012-02-14
Language:    Javascript - JQuery
Website:     http://www.merickson.com/
Contact:     support@merickson.com

Copyright (c) 2012, Erickson and Associates
All rights reserved.

This source file is free software, under a BSD style license. This source file 
is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
PURPOSE. See the license files for details.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1 Redistributions of original source code, except the minimized version, must retain 
the above copyright notice, this list of conditions and the following disclaimer.

2 The name of Erickson and Associates may not be used to endorse or promote products 
derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY Erickson and Associates "AS IS" AND ANY EXPRESS OR IMPLIED 
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Erickson and 
Associates BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE 
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER 
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT 
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
/// -- Microsoft Visual Studio documentation template.
/// <summary>
/// 
/// </summary>
/// <param name="XXX" type="object"></param>
/// <returns></returns>
/// <remarks></remarks>

//=================================================================================================
// Ensure basic ECMAScript 5 (ES5) features and methods in Javascript are defined.
//
// The "window.console" object is a common FireBug object provided in most browsers. The
// following coded ensures this object is defined and basic methods of the
// console object are defined. See "http://getfirebug.com/wiki/index.php/Console_API"
// for documenation.
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };
if (!window.console.info) window.console.info = function () { };
if (!window.console.warn) window.console.warn = function () { };
if (!window.console.error) window.console.error = function () { };
if (!window.console.assert) window.console.assert = function (bTest, sMessage /*, ... */) { };

console.log("Loading jquery-easolutions-1.2.2.js.");

var g_JQueryEASolutions_oES5 = { Object: {}, Array: { prototype: {}} };

g_JQueryEASolutions_oES5.Object.keys = function (obj) {
   /// <summary>
   /// Returns the names of the enumerable properties and methods of an object.
   /// </summary>
   /// <param name="obj" type="object">Object to get enumerable properties of.</param>
   /// <returns>Array of strings containing key values.</returns>
   /// <remarks>ES5 feature.</remarks>
   if ((obj == null) || ((typeof obj) != "object")) throw new TypeError("Argument is not an object.");
   var result = [];
   if (obj.constructor.toString().indexOf("Array") > 0) {
      for (var idx = 0; idx < obj.length; idx++) {
         if (idx in obj) result.push(idx);
      }
   } else {
      if (obj.constructor && obj.constructor.prototype) {
         for (var prop in obj)
            if ((prop in obj) && (!(prop in obj.constructor.prototype)))
               result.push(prop);
      } else {
         for (var prop in obj)
            if (prop in obj)
               result.push(prop);
      }
   }
   return result;
}
if (!Object.keys) Object.keys = g_JQueryEASolutions_oES5.Object.keys;

g_JQueryEASolutions_oES5.Array.prototype.forEach = function (fnCallback, oThis) {
   /// <summary>
   /// Call a function for each item in an array.
   /// </summary>
   /// <param name="fnCallback" type="function">
   /// Callback function of form "function(item, idx, arrayObject)" to be called for each item in the array.
   /// </param>
   /// <param name="oThis" type="object">
   /// Default=undefined. Value to set "this" for the call to "fnCallback" function.
   /// </param>
   /// <returns>Undefined.</returns>
   /// <remarks>ES5 feature.</remarks>
   if ((typeof fnCallback) != "function") throw new TypeError("First argument is not callable.");

   var self = this, len = self.length;
   for (var idx = 0; idx < len; idx++) {
      if (idx in self) fnCallback.call(oThis, self[idx], idx, self);
   }
}
if (!Array.prototype.forEach) Array.prototype.forEach = g_JQueryEASolutions_oES5.Array.prototype.forEach;

g_JQueryEASolutions_oES5.Array.prototype.forEachUntil = function (fnCallback, oThis) {
   /// <summary>
   /// Call a function for each item in an array until the function returns boolean "true" or the end of list is found.
   /// </summary>
   /// <param name="fnCallback" type="function">
   /// Callback function of type "function(item, idx, arrayObject)" to be called for each item in the array.
   /// If this callback function ever returns the boolean constant "true" then calls will stop and this function will
   /// return "true", otherwise the callback is called for every item in the array and this function will 
   /// return "false".
   /// </param>
   /// <returns type="boolean">"true" if callback ever returns "true", otherwise "false".</returns>
   /// <remarks>E&A Enhancement.</remarks>
   if ((typeof fnCallback) != "function") throw new TypeError("First argument is not callable.");

   var self = this, len = self.length, result = false;
   for (var idx = 0; idx < len; idx++) {
      if (idx in self) {
         if (true === fnCallback.call(oThis, self[idx], idx, self)) {
            result = true;
            break;
         }
      }
   }
   return result;
}
if (!Array.prototype.forEachUntil) Array.prototype.forEachUntil = g_JQueryEASolutions_oES5.Array.prototype.forEachUntil;

g_JQueryEASolutions_oES5.Array.prototype.every = function (fnCallback, oThis) {
   /// <summary>
   /// Call a function for each item in an array while the function returns "true" or the end of list is found.
   /// </summary>
   /// <param name="fnCallback" type="function">
   /// Callback function of type "function(item, idx, arrayObject)" to be called for each item in the array.
   /// If this callback function ever returns a false value then calls will stop and this function will
   /// return "false", otherwise the callback is called for every item in the array and this function will 
   /// return "true".
   /// </param>
   /// <returns type="boolean">"false" if callback ever returns a false value, otherwise "true".</returns>
   /// <remarks>ES5 feature.</remarks>
   if ((typeof fnCallback) != "function") throw new TypeError("First argument is not callable.");

   var self = this, len = self.length, result = true;
   for (var idx = 0; idx < len; idx++) {
      if (idx in self) {
         if (!fnCallback.call(oThis, self[idx], idx, self)) {
            result = false;
            break;
         }
      }
   }
   return result;
}
if (!Array.prototype.forEachUntil) Array.prototype.every = g_JQueryEASolutions_oES5.Array.prototype.every;

g_JQueryEASolutions_oES5.Array.prototype.indexOf = function (item) {
   /// <summary>
   /// Search an array for the specified item using the "==" method for comparisons.
   /// </summary>
   /// <param name="item" type="object">Item to search for in array.</param>
   /// <returns>Index of item in array or (-1) if not found.</returns>
   /// <remarks>ES5 feature.</remarks>
   var self = this, len = self.length, result = (-1);
   for (var idx = 0; idx < len; idx++) {
      if (item == self[idx]) {
         result = idx;
         break;
      }
   }
   return result;
}
if (!Array.prototype.indexOf) Array.prototype.indexOf = g_JQueryEASolutions_oES5.Array.prototype.indexOf;

g_JQueryEASolutions_oES5.Array.prototype.lastIndexOf = function (item) {
   /// <summary>
   /// Search an array backwards from the end for the specified item using the "==" method for comparisons.
   /// </summary>
   /// <param name="item" type="object">Item to search for in array.</param>
   /// <returns>Index of item in array or (-1) if not found.</returns>
   /// <remarks>ES5 feature.</remarks>
   var self = this, len = self.length, result = (-1);
   for (var idx = (len-1); idx >= 0; idx--) {
      if (item == self[idx]) {
         result = idx;
         break;
      }
   }
   return result;
}
if (!Array.prototype.indexOf) Array.prototype.lastIndexOf = g_JQueryEASolutions_oES5.Array.prototype.lastIndexOf;

g_JQueryEASolutions_oES5.Array.prototype.reduce = function reduce(fnAccumulator, oInitialValue) {
   /// <summary>
   /// Accumulates a single result by calling a defined callback function for all elements in an array.
   /// The return value of the callback function is the accumulated result, and is provided as an 
   /// argument in the next call to the callback function.
   /// </summary>
   /// <param name="fnAccumulator" type="function">
   /// Callback function of type "fnAccumulator(result, item, idx, arrayObject)" to be
   /// called for each element of the array, unless an initial value is not provided then the first
   /// element of the array is used for the initial value of "result".
   /// "result" is the current result from initial value or previous call, "item" is the value of this
   /// array element, "idx" is the index of this array element and "arrayObject" is the array being
   /// reduced. Return value of this callback is assigned to the result value for the next callback or
   /// return value of this method.
   /// </param>
   /// <param name="oInitialValue" type="object">
   /// Optional but recommended.
   /// If oInitialValue is specified, it is used as the initial value to start the accumulation.
   /// If oInitialValue is not specified, then the first element in the array is used, but an error is thrown if
   /// the array is empty.
   /// </param>
   /// <returns>An object that contains the accumulated result from the last call to the callback function.</returns>
   /// <remarks>ES5 feature.</remarks>
   if ((typeof fnAccumulator) !== "function") throw new TypeError("First argument is not callable.");

   var self = this, iStart = 0, len = self.length, result;
   if (arguments.length < 2) {
      // Use first element of the array for the initial value.
      if ((len == 0) || (len === null)) throw new TypeError("Array length is 0 and no second argument");
      result = self[0];
      iStart = 1;
   } else {
      // Use the initial value provided.
      result = oInitialValue;
   }
   for (var idx = iStart; idx < len; ++idx) {
      if (idx in self) result = fnAccumulator.call(undefined, result, self[idx], idx, self);
   }
   return result;
}
if (!Array.prototype.reduce) Array.prototype.reduce = g_JQueryEASolutions_oES5.Array.prototype.reduce;

g_JQueryEASolutions_oES5.Array.prototype.filter = function (fnCallback, oThis) {
   /// <summary>
   /// Returns the elements of an array that meet the condition specified in a callback function.
   /// </summary>
   /// <param name="fnCallback" type="function">
   /// Callback function of form "function(item, idx, arrayObject)" to be called for each item in the array.
   /// If this callback returns true, then this item is added to the resulting output.
   /// </param>
   /// <param name="oThis" type="object">
   /// Default=undefined. Value to set "this" for the call to "fnCallback" function.
   /// </param>
   /// <returns>
   /// A new array that contains all the values for which the callback function returns true.
   /// If the callback function returns false for all elements of the array, the length of the 
   /// new array is 0.
   /// </returns>
   /// <remarks>ES5 feature.</remarks>
   if ((typeof fnCallback) !== "function") throw new TypeError("First argument is not callable.");

   var self = this, len = self.length, item, result = [];
   for (var idx = 0; idx < len; idx++) {
      if (idx in self) {
         item = self[idx];
         if (fnCallback.call(oThis, item, idx, self)) result.push(item);
      }
   }
   return result;
}
if (!Array.prototype.filter) Array.prototype.filter = g_JQueryEASolutions_oES5.Array.prototype.filter;

g_JQueryEASolutions_oES5.Array.prototype.peek = function (oDefault) {
   /// <summary>
   /// Obtains the last element of an array without removing it.
   /// </summary>
   /// <param name="oDefault" type="object">Default=undefined. Default value if array is empty. Default is undefined.</param>
   /// <returns>Last element of the array or default value if array is empty.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   if (this.length <= 0) return oDefault;
   return this[this.length - 1];
}
if (!Array.prototype.peek) Array.prototype.peek = g_JQueryEASolutions_oES5.Array.prototype.peek;

g_JQueryEASolutions_oES5.Array.prototype.isEmpty = function () {
   /// <summary>
   /// Determine if an array is empty.
   /// </summary>
   /// <returns>"true" if this array is empty.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   return (this.length <= 0);
}
if (!Array.prototype.isEmpty) Array.prototype.isEmpty = g_JQueryEASolutions_oES5.Array.prototype.isEmpty;

g_JQueryEASolutions_oES5.Array.isArray = function (obj) {
   /// <summary>
   /// Indicates if an object is an array.
   /// </summary>
   /// <param name="obj" type="object">Object to test.</param>
   /// <returns>"true" if object is an array.</returns>
   /// <remarks>ES5 feature.</remarks>
   return (obj && ((typeof obj) == "object") && (obj.constructor.toString().indexOf("Array") > 0)) ? true : false;
}
if (!Array.isArray) Array.isArray = g_JQueryEASolutions_oES5.Array.isArray;

//=================================================================================================
String.prototype.trim = function () {
   /// <summary>
   /// Trim leading and trailing blanks from a string.
   /// </summary>
   /// <returns>String with leading and trailing blanks removed.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   return this.replace(/^\s+/, "").replace(/\s+$/, "");
}
String.prototype.ltrim = function () {
   /// <summary>
   /// Trim leading blanks from a string.
   /// </summary>
   /// <returns>String with leading blanks removed.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function () {
   /// <summary>
   /// Trim trailing blanks from a string.
   /// </summary>
   /// <returns>String with trailing blanks removed.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   return this.replace(/\s+$/, "");
}
String.prototype.contains = function (str) {
   /// <summary>
   /// Determine if the current string contains a specified string.
   /// </summary>
   /// <param name="str" type="string">String to check if exists in the current string.</param>
   /// <returns>"true" if the specified string exists in the current string. If "str" is null or not a string, then return "false".</returns>
   /// <remarks>E&A Enhancement.</remarks>
   return (((typeof str) == "string") ? (this.indexOf(str) >= 0) : false);
}
String.prototype.startsWith = function (str) {
   /// <summary>
   /// Determine if the current string starts with a specified string.
   /// </summary>
   /// <param name="str" type="string">String to check if the current string starts with this string.</param>
   /// <returns>"true" if the current string starts with the specified string. If "str" is null or not a string, then return "false".</returns>
   /// <remarks>E&A Enhancement.</remarks>
   if ((typeof str) != "string") return false;
   if (this.length < str.length) return false;
   return (this.substr(0, str.length) == str) ? true : false;
}
String.prototype.endsWith = function (str) {
   /// <summary>
   /// Determine if the current string ends with a specified string.
   /// </summary>
   /// <param name="str" type="string">String to check if the current string ends with this string.</param>
   /// <returns>"true" if the current string ends with the specified string. If "str" is null or not a string, then return "false".</returns>
   /// <remarks>E&A Enhancement.</remarks>
   if ((typeof str) != "string") return false;
   var idx = this.length - str.length;
   if (idx < 0) return false;
   return (this.substr(idx) == str) ? true : false;
}
String.prototype.removePrefix = function (str) {
   /// <summary>
   /// If this string starts with the specified string, then remove the specified string from the start of this string.
   /// </summary>
   /// <param name="str" type="string">String to remove from the beginning of this string.</param>
   /// <returns>Resulting string with string removed from the beginning as required.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   // Note: "this" is an object but may not be a string, this is the case for IE9.
   if ((typeof str) != "string") return this.toString();
   if (this.length < str.length) return this.toString();
   return (this.substr(0, str.length) == str) ? this.substr(str.length) : this.toString();
}
String.prototype.removeSuffix = function (str) {
   /// <summary>
   /// If this string ends with the specified string, then remove the specified string from the end of this string.
   /// </summary>
   /// <param name="str" type="string">String to remove from the end of this string.</param>
   /// <returns>Resulting string with string removed from the end as required.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   // Note: "this" is an object but may not be a string, this is the case for IE9.
   if ((typeof str) != "string") return this.toString();
   var idx = this.length - str.length;
   if (idx < 0) return this.toString();
   return (this.substr(idx) == str) ? this.substr(0, idx) : this.toString();
}
String.prototype.beforeFirst = function (str, sDefault) {
   /// <summary>
   /// Obtain the string before the first occurance of a specified string.
   /// </summary>
   /// <param name="str" type="string">String to search for in this string.</param>
   /// <param name="sDefault" type="string">Default value if string not found. Default is this string.</param>
   /// <returns>The string before the first occurrence of specified string in "str" if found, otherwise the default value.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   // Note: "this" is an object but may not be a string, this is the case for IE9.
   if ((typeof str) != "string") return ((typeof sDefault) == "undefined") ? this.toString() : sDefault;
   var idx = this.indexOf(str);
   if (idx < 0) return ((typeof sDefault) == "undefined") ? this.toString() : sDefault;
   return this.substr(0, idx);
}
String.prototype.afterFirst = function (str, sDefault) {
   /// <summary>
   /// Obtain the string after the first occurance of a specified string.
   /// </summary>
   /// <param name="str" type="string">String to search for in this string.</param>
   /// <param name="sDefault" type="string">Default value if string not found. Default is this string.</param>
   /// <returns>The string after the first occurrence of specified string in "str" if found, otherwise the default value.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   // Note: "this" is an object but may not be a string, this is the case for IE9.
   if ((typeof str) != "string") return ((typeof sDefault) == "undefined") ? this.toString() : sDefault;
   var idx = this.indexOf(str);
   if (idx < 0) return ((typeof sDefault) == "undefined") ? this.toString() : sDefault;
   return this.substr(idx + str.length);
}
String.prototype.beforeLast = function (str, sDefault) {
   /// <summary>
   /// Obtain the string before the last occurance of a specified string.
   /// </summary>
   /// <param name="str" type="string">String to search for in this string.</param>
   /// <param name="sDefault" type="string">Default value if string not found. Default is this string.</param>
   /// <returns>The string before the last occurrence of specified string in "str" if found, otherwise the default value.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   // Note: "this" is an object but may not be a string, this is the case for IE9.
   if ((typeof str) != "string") return ((typeof sDefault) == "undefined") ? this.toString() : sDefault;
   var idx = this.lastIndexOf(str);
   if (idx < 0) return ((typeof sDefault) == "undefined") ? this.toString() : sDefault;
   return this.substr(0, idx);
}
String.prototype.afterLast = function (str, sDefault) {
   /// <summary>
   /// Obtain the string after the last occurance of a specified string.
   /// </summary>
   /// <param name="str" type="string">String to search for in this string.</param>
   /// <param name="sDefault" type="string">Default value if string not found. Default is this string.</param>
   /// <returns>The string after the last occurrence of specified string in "str" if found, otherwise the default value.</returns>
   /// <remarks>E&A Enhancement.</remarks>
   // Note: "this" is an object but may not be a string, this is the case for IE9.
   if ((typeof str) != "string") return ((typeof sDefault) == "undefined") ? this.toString() : sDefault;
   var idx = this.lastIndexOf(str);
   if (idx < 0) return ((typeof sDefault) == "undefined") ? this.toString() : sDefault;
   return this.substr(idx + str.length);
}
; // Necessary to reset parser in IE.


// ================================================================================================
// JQuery extensions.
//
// The following global is defined to keep syntax analyzers happy.
var g_JQueryEASolutions = (function ($) {
   // NOTE: (this === jQuery) && ($ === jQuery)

   // List of possible HTML node types.
   $.EHTMLNodeTypes = { Element: 1, Attribute: 2, Text: 3, Comment: 8, Document: 9 }

   // --------------------------------------------------------------------------------------------
   // Utilities
   // --------------------------------------------------------------------------------------------
   //isDefined - Determine if a value is defined.
   $.isDefined = function (o) { return ((typeof o) != "undefined"); }
   //isUndefined - Determine if a value is undefined.
   $.isUndefined = function (o) { return ((typeof o) == "undefined"); }
   //isNothing - Determine if a value is undefined or null.
   $.isNothing = function (o) { return ((typeof o) == "undefined") || (o == null); }
   //isObject - Determine if a value is an object.
   $.isObject = function (o) { return (o != null) && ((typeof o) == "object") && (!$.isArray(o)); }
   //isString - Determine if a value is a string.
   $.isString = function (o) { return ((typeof o) == "string"); }
   //isBlank - Determine if a value is undefined, null or a blank string.
   $.isBlank = function (o, bTrim) {
      /// <summary>
      /// Determine if a value is undefined, null or a blank string.
      /// </summary>
      /// <param name="o" type="object">Value to check.</param>
      /// <param name="bTrim" type="boolean">Default=true. Indicates blank space is trimmed if the value is a string.</param>
      /// <returns>True if value is blank.</returns>
      /// <remarks></remarks>
      if ($.isNothing(o)) return true;
      if ($.isString(o)) {
         if ($.isUndefined(bTrim)) bTrim = true;
         if (bTrim) o = o.rtrim();
         if (o === "") return true;
      }
      return false;
   }
   $.asString = function (oVal, sDefault) {
      /// <summary>
      /// Convert object to a string or return default if cannot convert.
      /// </summary>
      /// <param name="oVal" type="object">Value to be converted to a string.</param>
      /// <param name="sDefault" type="string">Default value if value is undefined, nothing or cannot be converted to a string.</param>
      /// <returns>Value as string or default value.</returns>
      /// <remarks></remarks>
      var sResult = sDefault;
      try {
         if (!$.isNothing(oVal)) sResult = oVal.toString();
      } catch (err) {
         sResult = sDefault;
      }
      return sResult;
   }
   $.asInt = function (oVal, iDefault) {
      /// <summary>
      /// Convert object to an integer or return default if cannot convert.
      /// </summary>
      /// <param name="oVal" type="object">Value to be converted to an integer.</param>
      /// <param name="sDefault" type="string">Default value if value is undefined, nothing or cannot be converted to an integer.</param>
      /// <returns>Value as integer or default value.</returns>
      /// <remarks></remarks>
      if ($.isArray(oVal)) return iDefault;
      var fResult = parseFloat(oVal);
      return (!isNaN(fResult) && isFinite(fResult)) ? Math.round(fResult) : iDefault;
   }
   $.asFloat = function (oVal, fDefault) {
      /// <summary>
      /// Convert object to a float or return default if cannot convert.
      /// </summary>
      /// <param name="oVal" type="object">Value to be converted to a float.</param>
      /// <param name="sDefault" type="string">Default value if value is undefined, nothing or cannot be converted to a float.</param>
      /// <returns>Value as float or default value.</returns>
      /// <remarks></remarks>
      if ($.isArray(oVal)) return fDefault;
      var fResult = parseFloat(oVal);
      return (!isNaN(fResult) && isFinite(fResult)) ? fResult : fDefault;
   }
   $.asBool = function (oVal, bDefault) {
      /// <summary>
      /// Convert object to a boolean or return default if cannot convert.
      /// </summary>
      /// <param name="oVal" type="object">Value to be converted to a boolean.</param>
      /// <param name="sDefault" type="string">Default value if value is undefined, nothing or cannot be converted to a boolean.</param>
      /// <returns>Value as boolean or default value.</returns>
      /// <remarks></remarks>
      var bResult = bDefault ? true : false;
      switch (typeof oVal) {
         case "boolean":
            bResult = oVal;
            break;
         default:
            var iResult = $.asInt(oVal, NaN);
            if (isNaN(iResult)) {
               try {
                  switch ($.asString(oVal, "").ltrim().substr(0, 1).toLowerCase()) {
                     case "t": case "y": bResult = true; break;
                     case "f": case "n": bResult = false; break;
                  }
               } catch (err) {
                  // Do nothing
               }
            } else {
               bResult = (iResult != 0);
            }
            break;
      }
      return bResult;
   }
   var m_iStartTime = (new Date()).getTime();
   $.TimeStamp = function () {
      /// <summary>
      /// Get number of milliseconds since page was loaded.
      /// </summary>
      /// <returns>Integer number of milliseconds since page was loaded.</returns>
      /// <remarks></remarks>
      return ((new Date()).getTime()) - m_iStartTime;
   }
   $.HasTimedOut = function (iStart, iMaxMilliseconds) {
      /// <summary>
      /// Indicates the specified number of milliseconds has elapsed since the specified start time.
      /// </summary>
      /// <param name="iStart" type="integer">Start time of timeout period.</param>
      /// <param name="iMaxMilliseconds" type="integer">Number of milliseconds to check if elapse time has occurred.</param>
      /// <returns>True if the specified number of milliseconds has elapsed.</returns>
      /// <remarks></remarks>
      return (iMaxMilliseconds < ($.TimeStamp() - iStart));
   }
   function parsedURL(url) {
      /// <summary>
      /// Constructor for a parsed URL object.
      /// </summary>
      /// <param name="url" type="object">Default=windows.location.href. URL containing the parameters to parse.</param>
      /// <returns>Instance of this object to support inheritance.</returns>
      /// <remarks></remarks>
      var self = this;
      self._url = url || window.location.href;

      if (self._url) {
         var sp = self._url.trim().afterFirst("?", null);
         if (!$.isBlank(sp)) {
            sp = decodeURI(sp.replace(/&amp;/ig, "§"));
            var ap = sp.split("&");
            ap.forEach(function (item, idx) {
               item = item.replace("§", "&");
               var sName = item.beforeFirst("=", null);
               if (sName) self[sName] = item.afterFirst("=");
            });
         }
      }
      return self;
   }
   parsedURL.prototype.hasParam = function (sName) { return $.isDefined(this[sName]); }
   parsedURL.prototype.asString = function (sName, sDefault) { return $.asString(this[sName], sDefault); }
   parsedURL.prototype.asInt = function (sName, iDefault) { return $.asInt(this[sName], iDefault); }
   parsedURL.prototype.asFloat = function (sName, fDefault) { return $.asFloat(this[sName], iDefault); }
   parsedURL.prototype.asBool = function (sName, bDefault) { return $.asBool(this[sName], bDefault); }

   $.parseURL = function (url) {
      /// <summary>
      /// Parse the parameters in a URL and return as a JSON object.
      /// </summary>
      /// <param name="url" type="object">Default=windows.location.href. URL containing the parameters to parse.</param>
      /// <returns>Parsed URL object containing the URL parameters as items with the item "_url" that contains the url that was parsed.</returns>
      /// <example>var oURL = $.parseURL("http://test/method?a=aval&b=t&c=3");</example>
      return new parsedURL(url);
   }
   var _LastID = 0;
   $.NextID = function () {
      /// <summary>
      /// Get the next integer identifier greater than zero.
      /// </summary>
      /// <returns>Next integer identifier always greater than zero.</returns>
      /// <remarks></remarks>
      return ++_LastID;
   }
   $.StringStringify = function (obj) {
      /// <summary>
      /// Stringify a string object.
      /// </summary>
      /// <param name="obj" type="string">String object to stringify.</param>
      /// <returns>String containing text definition of string in JSON form.</returns>
      /// <remarks></remarks>
      return '"' + obj.toString().replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'
   }
   $.JSONstringify = function (obj) {
      /// <summary>
      /// Stringify an object to print in a debug statement.
      /// </summary>
      /// <param name="obj" type="object">Object to stringify.</param>
      /// <returns>String containing text definition of object in JSON form.</returns>
      /// <remarks></remarks>
      var p = "", r = "", idx = 0, item;

      switch (typeof obj) {
         case "undefined":
            r = "undefined";
            break;
         case "number":
         case "boolean":
            r = obj.toString();
            break;
         case "string":
            r = $.StringStringify(obj);
            break;
         case "object":
            if (obj == null) {
               r = "null";
            } else {
               if (Array.isArray(obj)) {
                  if (obj.length <= 0) {
                     r = "[]";
                  } else {
                     var max = obj.length;
                     p = ""; r = "[ ";
                     for (idx = 0; idx < max; idx++) {
                        r += p + $.JSONstringify(obj[idx]);
                        p = ", ";
                     }
                     r += " ]";
                  }
               } else {
                  p = ""; r = "{ ";
                  if (obj.constructor && obj.constructor.prototype) {
                     for (item in obj) {
                        if ((item in obj) && (!(item in obj.constructor.prototype))) {
                           r += p + $.StringStringify(item) + ': ' + $.JSONstringify(obj[item]);
                           p = ", ";
                        }
                     }
                  } else {
                     for (item in obj) {
                        if (item in obj) {
                           r += p + $.StringStringify(item) + ': ' + $.JSONstringify(obj[item]);
                           p = ", ";
                        }
                     }
                  }
                  r += " }";
               }
            }
            break;
         case "function":
            r = obj.toString();
            break;
         default:
            r = $.StringStringify(obj);
            break;
      }
      return r;
   }
   $.DebugStringify = function (obj, iLevel, oOptions) {
      /// <summary>
      /// Stringify an object to print in a debug statement.
      /// </summary>
      /// <param name="obj" type="object">Object to stringify.</param>
      /// <param name="iLevel" type="int">Optional, maximum level to stringify object, default=1</param>
      /// <param name="oOptions" type="object">Optional, options object to this method.</param>
      /// <returns></returns>
      /// <remarks></remarks>
      iLevel = $.asInt(iLevel, 1);
      options = { maxStringLength: 32, maxArrayLength: 16 };
      $.extend(options, oOptions);

      var p = "";
      var r = "";
      var idx = 0;

      switch (typeof obj) {
         case "number":
         case "boolean":
            r = obj.toString();
            break;
         case "string":
            if (obj.length <= options.maxStringLength) {
               r = "'" + obj.toString().replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
            } else {
               r = "'" + obj.substr(0, options.maxStringLength).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "...'";
            }
            break;
         case "object":
            if (obj == null) {
               r = "null";
            } else {
               if (Array.isArray(obj)) {
                  if (iLevel < 1) {
                     r = "Array(" + obj.length + ")";
                  } else if (obj.length <= 0) {
                     r = "[]";
                  } else {
                     var max = Math.min(options.maxArrayLength, obj.length);
                     p = ""; r = "[ ";
                     for (idx = 0; idx < max; idx++) {
                        r += p + $.DebugStringify(obj[idx], iLevel - 1, options);
                        p = ", ";
                     }
                     if (options.maxArrayLength < obj.length) {
                        r += "...<<of Array(" + obj.length + ")>>...]";
                     } else {
                        r += " ]";
                     }
                  }
               } else {
                  if (iLevel < 1) {
                     r = (typeof obj);
                  } else {
                     p = ""; r = "{ ";
                     for (var item in obj) {
                        r += p + item + ": " + $.DebugStringify(obj[item], iLevel - 1, options);
                        p = ", ";
                     }
                     r += " }";

                  }
               }
            }
            break;
         case "function":
            switch (obj.name) {
               case "observable":
                  var val = obj.call();
                  r = "observable(" + $.DebugStringify(val, iLevel - 1, options) + ")";
                  break;
               default:
                  r = (typeof obj);
                  break;
            }
            break;
         default:
            r = (typeof obj);
            break;
      }
      return r;
   }
   function _makeSparceArray(arr) {
      var len = arr.length;
      for (var idx = 0; idx < len; idx++) {
         if ((idx in arr) && ($.isUndefined(arr[idx]))) delete arr[idx];
      }
   }
   function _evalObjectArrays(obj) {
      if ($.isObject(obj)) {
         for (var key in obj) {
            if ($.isArray(obj[key])) _makeSparceArray(obj[key]);
         }
      }
   }
   // The following global is used by "JSONParse".
   $._JSONParseEval = null;
   $.JSONparse = function (sJSON, oOptions) {
      /// <summary>
      /// Parse a string as a JSON object.
      /// </summary>
      /// <param name="sJSON" type="string">JSON string to parse.</param>
      /// <param name="oOptions" type="object">Options to this method.</param>
      /// <returns>Resulting JSON object.</returns>
      /// <remarks>
      /// Unlike the method "jQuery.parseJSON", any normal JSON definition support by the
      /// Javascript parser is correctly parse by this method. This is because the Javascript
      /// parser is actually used to generate the JSON object using the "eval" method. Therefore
      /// the JSON string "{ test: 1 }" is correctly parsed by this method.
      ///
      /// An error is thrown with the specified error message if the JSON definition is incorrect.
      /// </remarks>
      /// <example>
      /// var obj = $.JSONParse("{ test: 1 }");
      /// </example>
      var opt = {
         errMessage: "Error evaluating JSON string",
         context: this,
         throwError: true,
         evalSparceArrays: true
      };
      $.extend(opt, oOptions);
      var oResult = null;

      if ($.isBlank(sJSON)) return oResult;

      try {
         sJSON = $.trim(sJSON);
         var schar = sJSON.substr(0, 1);
         if ((sJSON != "null") && (schar != "{") && (schar != "[")) sJSON = "{ " + sJSON + " }"; // ] } balance left bracket for text editor.
         var sExp = "jQuery._JSONParseEval = function() { return " + sJSON + "; }";
         eval(sExp);
         oResult = $._JSONParseEval.call(opt.context);
         if (opt.evalSparceArrays) _evalObjectArrays(oResult);
      } catch (err) {
         oResult = null;
         if (opt.throwError) throw opt.errMessage + ", " + err.toString() + ": " + sJSON;
      }
      return oResult;
   }
   //-------------------------------------------------------------------------
   // Dictionary class.
   $.Dictionary = function () {
      /// <summary>
      /// Class definition for an object that manages a list of objects that have a key.
      /// </summary>
      /// <returns>The object created.</returns>
      /// <remarks></remarks>
      /// <example>
      /// var myDict = new $.Dictionary();
      /// </example>
      this._data = {};
      this.length = 0;
      return this;
   }
   $.Dictionary.prototype.add = function (sKey, oItem) {
      /// <summary>
      /// Add an object to the list of objects for a key.
      /// If key does not exist it is created.
      /// </summary>
      /// <param name="sKey" type="string">Key to list of objects in dictionary.</param>
      /// <param name="oItem" type="object">Object to include in list, if already in list it is not added.</param>
      /// <returns>Dictionary object.</returns>
      /// <remarks></remarks>
      if (!this._data[sKey]) {
         this._data[sKey] = [];
         this.length++;
      }
      if (0 > this._data[sKey].indexOf(oItem)) this._data[sKey].push(oItem);
      return this;
   }
   $.Dictionary.prototype.remove = function (sKey, oItem) {
      /// <summary>
      /// Remove an object from the list of objects for a key or remove a key from the dictionary object.
      /// No error if the key does not exists.
      /// </summary>
      /// <param name="sKey" type="string">Key to list of objects in dictionary.</param>
      /// <param name="oItem" type="object">Optional, object to remove from list or if undefined, then the key and all associated objects are removed from the dictionary.</param>
      /// <returns>Dictionary object.</returns>
      /// <remarks></remarks>
      if ($.isUndefined(oItem))
      {
         if (this._data[sKey]) {
            delete this._data[sKey];
            this.length--;
         }
      }
      else if (this._data[sKey])
      {
         this._data[sKey] = this._data[sKey].filter(function (item, idx) { return item !== oItem; });
         if (this._data[sKey].length <= 0) {
            delete this._data[sKey];
            this.length--;
         }
      }
      return this;
   }
   $.Dictionary.prototype.containsKey = function (sKey) {
      /// <summary>
      /// Determine if the specified key is defined in the dictionary.
      /// </summary>
      /// <param name="sKey" type="string">Key to search for in dictionary.</param>
      /// <returns>True if the specified key is defined in dictionary.</returns>
      /// <remarks></remarks>
      return $.isDefined(this._data[sKey]);
   }
   $.Dictionary.prototype.list = function (sKey) {
      /// <summary>
      /// Get list of objects for the specified key.
      /// If key does not exist, an empty list is returned.
      /// </summary>
      /// <param name="sKey" type="string">Key to list of objects in dictionary.</param>
      /// <returns>Array of objects found or empty array if key is not found in dictionary.</returns>
      /// <remarks></remarks>
      return this._data[sKey] || [];
   }
   $.Dictionary.prototype.each = function (oFunc) {
      /// <summary>
      /// Execute the specified function for each key in the dictionary.
      /// Function must have the form "function(sKey, aObjects)", where this is the dictionary object.
      /// </summary>
      /// <param name="oFunc" type="function">Function to execute for each key in the dictionary.</param>
      /// <returns>Dictionary object.</returns>
      /// <remarks></remarks>
      for (var sKey in this._data) {
         oFunc.call(this, sKey, this._data[sKey]);
      }
      return this;
   }
   $.Dictionary.prototype.eachUntil = function (oFunc) {
      /// <summary>
      /// Execute the specified function for each key in the dictionary until the function returns "true".
      /// Function must have the form "boolean function(sKey, aObjects)", where this is the dictionary object.
      /// </summary>
      /// <param name="oFunc" type="function">Function to execute for each key in the dictionary.</param>
      /// <returns>The value "true" if a function call returned "true", otherwise "false".</returns>
      /// <remarks></remarks>
      var bResult = false;
      for (var sKey in this._data) {
         if (oFunc.call(this, sKey, this._data[sKey]) === true) {
            bResult = true;
            break;
         }
      }
      return bResult;
   }
   // End dictionary class.
   //-------------------------------------------------------------------------

   //-------------------------------------------------------------------------
   // Event locker class.
   $.EventLocker = function (iTimeout) {
      /// <summary>
      /// Class definition of an object to manage time dependant locking.
      /// </summary>
      /// <param name="iTimeout" type="interger">Lock timeout in milliseconds.</param>
      /// <returns>The object created.</returns>
      /// <remarks>
      /// Use the following to create an object of this type:
      ///     var myLock = new $.EventLocker(500);
      /// </remarks>
      this._lastEventTime = (-9999);
      this._timeOut = $.asInt(iTimeout, 300);
      if (this._timeOut <= 0) this._timeOut = 300;
      return this;
   }
   $.EventLocker.prototype.isLocked = function (iTimeout) {
      /// <summary>
      /// Determine if this object is locked.
      /// </summary>
      /// <param name="iTimeout" type="interger">Optional timeout period, in milliseconds, the event is considered locked.</param>
      /// <returns>True if event lock is locked.</returns>
      /// <remarks></remarks>
      return $.HasTimedOut(this._lastEventTime, iTimeout || this._timeOut) ? false : true;
   }
   $.EventLocker.prototype.setLock = function (iTimeout) {
      /// <summary>
      /// Attempt to lock this object if not already locked.
      /// </summary>
      /// <param name="iTimeout" type="interger">Optional timeout period, in milliseconds, the event is considered locked.</param>
      /// <returns>True if event lock was locked by this call.</returns>
      /// <remarks></remarks>
      var bResult = false;
      if (!this.isLocked(iTimeout)) {
         bResult = true;
         this._lastEventTime = $.TimeStamp();
      }
      return bResult;
   }
   $.EventLocker.prototype.setLockForce = function (iTimeout) {
      /// <summary>
      /// Attempt to lock this object if not already locked and update start timer even if locked.
      /// </summary>
      /// <param name="iTimeout" type="interger">Optional timeout period, in milliseconds, the event is considered locked.</param>
      /// <returns>True if event lock was locked by this call.</returns>
      /// <remarks></remarks>
      var bResult = !this.isLocked(iTimeout);
      this._lastEventTime = $.TimeStamp();
      return bResult;
   }
   $.EventLocker.prototype.unlock = function (iTimeout) {
      /// <summary>
      /// Unlock this object.
      /// </summary>
      /// <param name="iTimeout" type="interger">Optional timeout period, in milliseconds, the event is considered locked.</param>
      /// <returns>True if event lock was unlocked by this call.</returns>
      /// <remarks></remarks>
      var bResult = this.isLocked(iTimeout);
      this._lastEventTime = (-9999);
      return bResult;
   }
   // End event locker class.
   //-------------------------------------------------------------------------

   // --------------------------------------------------------------------------------------------
   // Extensions to JQuery objects.
   // --------------------------------------------------------------------------------------------
   $.applyPluginSingleton = function (jqObject, oPlugin, args) {
      /// <summary>
      /// Apply operation on a singleton handler to a JQuery object.
      /// </summary>
      /// <param name="jqObject" type="object">jQuery object to apply plugin to, normally is "this".</param>
      /// <param name="oPlugin" type="object">Plugin singleton object to apply.</param>
      /// <param name="args" type="object">Arguments to the method, where the "args[0]" is examined to determine which method in "oPlugin" to invoke.</param>
      /// <returns>Value provided by method.</returns>
      /// <remarks>
      /// A singleton handler is a single object that contains a list of
      /// methods that can be invoked on a JQuery object. The method invoked
      /// is determine from the first argument if it is a string, otherwise
      /// the method "init" is invoked.
      ///
      /// If "args[0]" is a string, then it is used to obtain the method to invoke
      /// within the handler (i.e. "oPlugin[args[0]]".) Otherwise method "init" is invoked.
      ///
      /// The arguments passed to the method invoked is the "jqObject" followed
      /// by the arguments in "args" excluding "args[0]" if it is a string.
      ///
      /// This method provides a generic implementation of "Plugin Methods"
      /// defined in the JQuery authoring documentation at the URL below.
      /// http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
      /// </remarks>
      var cmdArgs, sCommand = "init";

      if ($.isNothing(args) || (args.length <= 0)) {
         cmdArgs = [jqObject];
      } else if ($.isString(args[0])) {
         sCommand = args[0];
         if ($.isBlank(sCommand)) sCommand = "init";
         // Replace first argument with JQuery object, since first argument is a command.
         cmdArgs = Array.prototype.slice.call(args, 0);
         cmdArgs[0] = jqObject;
      } else {
         // Prepend JQuery object to list of arguments.
         cmdArgs = Array.prototype.slice.call(args, 0);
         cmdArgs.unshift(jqObject);
      }
      var method = oPlugin[sCommand];
      if (!$.isFunction(method)) {
         if ($.isDefined(oPlugin.error)) {
            oPlugin.error("commandError", sCommand);
         } else {
            var name = $.isString(oPlugin.name) ? oPlugin.name : oPlugin.constructor.toString();
            $.error(name + ': Command ' + sCommand + ' does not exist on ' + name);
         }
         return jqObject;
      }
      // Replace first argument wit JQuery object, since first argument is a command.
      cmdArgs = Array.prototype.slice.call(args, 0);
      cmdArgs[0] = jqObject;
      return method.apply(oPlugin, cmdArgs);
   }
   $.applyPluginHandler = function (jqObject, sName, fnCreator, args) {
      /// <summary>
      /// Create or apply handlers to DOM objects in the list of elements in a JQuery object.
      /// </summary>
      /// <param name="jqObject" type="object">jQuery list of elements, normally is "this".</param>
      /// <param name="sName" type="string">Name of key of data object for storing handler object in element.</param>
      /// <param name="fnCreator" type="function">Constructor function for the plugin handler objects.</param>
      /// <param name="args" type="object">Arguments to constructor and commands. If first argument is a string, it is assumed to be the name of the method to invoke.</param>
      /// <returns></returns>
      /// <remarks>
      /// A plugin handler is an object that is created for each element being handled.
      /// This method will create the handler using the "fnCreator" function if the
      /// handler does not exist, otherwise it will use the exiting handler.
      ///
      /// If "args[0]" is a string, then it is used to obtain the method to invoke
      /// within the handler (i.e. "oPlugin[args[0]]".) Otherwise no method is invoked.
      ///
      /// The arguments passed to the constructor and method invoked is a "oElement" followed
      /// by the arguments in "args" excluding "args[0]" if it is a string. The "jqElement"
      /// object is a JQuery object that contains the one element the handler is associated with.
      /// The object "this" is set to the plugin handler object.
      ///
      /// This method is an extended generic implementation of "Plugin Methods"
      /// defined in the JQuery authoring documentation at the URL below.
      /// http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
      /// </remarks>
      var cmdArgs, sCommand = null;

      if ($.isNothing(args) || (args.length <= 0)) {
         cmdArgs = [null];
      } else if ($.isString(args[0])) {
         sCommand = args[0];
         if ($.isBlank(sCommand)) sCommand = null;
         // Replace first argument with JQuery object, since first argument is a command.
         cmdArgs = Array.prototype.slice.call(args, 0);
      } else {
         // Prepend JQuery object to list of arguments.
         cmdArgs = Array.prototype.slice.call(args, 0);
         cmdArgs.unshift(null);
      }
      jqObject.each(function (idx) {
         var oPlugin = $.data(this, sName);
         if ($.isNothing(oPlugin)) {
            oPlugin = {};
            cmdArgs[0] = this;
            oPlugin = fnCreator.apply(oPlugin, cmdArgs);
            $.data(this, sName, oPlugin);
         }
         if (sCommand != null) {
            var method = oPlugin[sCommand];
            if ($.isFunction(method)) {
               cmdArgs[0] = this;
               method.apply(oPlugin, cmdArgs);
            } else {
               if ($.isDefined(oPlugin.error)) {
                  oPlugin.error("commandError", sCommand);
               } else {
                  var name = $.isString(oPlugin.name) ? oPlugin.name : oPlugin.constructor.toString();
                  $.error(name + ': Command ' + sCommand + ' does not exist on ' + name);
               }
            }
         }
      });
      return jqObject;
   }
   $.fn.firstItem = function () {
      /// <summary>
      /// Get first item in list or null if no items in list.
      /// </summary>
      /// <returns>First item in list or null if no items in list.</returns>
      /// <remarks></remarks>
      return (this.length > 0) ? this[0] : null;
   }
   $.fn.lastItem = function () {
      /// <summary>
      /// Get last item in list or null if no items in list.
      /// </summary>
      /// <returns>Last item in list or null if no items in list.</returns>
      /// <remarks></remarks>
      return (this.length > 0) ? this[this.length - 1] : null;
   }
   $.fn.isChecked = function () {
      /// <summary>
      /// Determines if any object is a checkbox that is checked.
      /// </summary>
      /// <returns>True if any object is a checkbox that is checked.</returns>
      /// <remarks></remarks>
      return this.is(':checked');
   }
   $.fn.setChecked = function (bValue) {
      /// <summary>
      /// Set checked status of all checkboxes.
      /// </summary>
      /// <param name="bValue" type="boolean">New checked status of all checkboxs.</param>
      /// <returns>JQuery object.</returns>
      /// <remarks></remarks>
      return this.prop('checked', bValue ? true : false);
   }
   $.fn.tableSort = function (oOptions) {
      /// <summary>
      /// Identify and define headers in a table for sorting.
      /// </summary>
      /// <param name="oOptions" type="object">Options to this method.</param>
      /// <returns>The JQuery object.</returns>
      /// <remarks>See documentation at "http://www.merickson.com/".</remarks>
      if (!oOptions) return this;

      this.filter("TABLE").each(function (idx) {
         var jqTable = $(this);

         var oStatus = {
            // Identifies an input element to store the order by list to be posted to the server.
            orderByInput: null,
            // Identifies form to submit when an order by is changed.
            submitForm: null,
            jqTable: jqTable,
            aoOrderBy: [],
            orderByInstance: function (sFieldOrderBy) {
               var sFieldName = sFieldOrderBy.beforeLast(" ");
               var sAsc = sFieldOrderBy.afterLast(" ");
               var bAsc = (sAsc.toLowerCase() == "desc") ? false : true;

               this.FieldName = sFieldName;
               this.Ascending = bAsc;
               this.AsString = function () { return this.FieldName + (this.Ascending ? " ASC" : " DESC"); }
               return this;
            },
            onOrderBy: function (ev, jqTH, sOrderBy) { },
            _init: function () {
               var self = this;
               var asOrderBy = [];
               var sOrderBy = $(self.orderByInput).val();
               if (sOrderBy) asOrderBy = sOrderBy.split(",");

               self.aoOrderBy = [];
               asOrderBy.forEach(function (item, idx) {
                  self.aoOrderBy.push(new self.orderByInstance(item));
               });
               //console.log("tableSort._init: %s", $.DebugStringify(asOrderBy, 2));
            },
            _onOrderBy: function (ev, jqTH, sOrderBy) {
               var self = this;
               var oOrderBy = new self.orderByInstance(sOrderBy);
               if ((self.aoOrderBy.length > 0) && (self.aoOrderBy[0].FieldName == oOrderBy.FieldName)) {
                  // Reverse order if same as topmost order.
                  self.aoOrderBy[0].Ascending = (!self.aoOrderBy[0].Ascending);
               } else {
                  // Add new field to order list.
                  self.aoOrderBy = self.aoOrderBy.filter(function (item) { return item.FieldName != oOrderBy.FieldName });
                  self.aoOrderBy.unshift(oOrderBy);
               }
               sOrderBy = self.aoOrderBy.reduce(function (prev, cur, idx) { return ((prev == "") ? prev : prev + ",") + cur.AsString(); }, "");
               //console.log("tableSort._onOrderBy: new sort: %s", sOrderBy);
               $(self.orderByInput).val(sOrderBy);
               $(self.submitForm).submit();
               self.onOrderBy(ev, jqTH, sOrderBy);
            }
         }
         $.extend(oStatus, oOptions);

         jqTable[0].tableSortStatus = oStatus;
         oStatus._init();

         // Setup each sortable column.
         jqTable.find("TH[orderby]").each(function (idx) {
            $(this).addClass("sorting");
            $(this).click(function (ev) {
               ev.preventDefault();
               oStatus._onOrderBy(ev, $(this), $(this).attr("orderby"));
            });
         });
      });
      return this;
   }
   $.fn.layoutBox = function () {
      /// <summary>
      /// Get current computed box metrics for the first element in the set of matched elements.
      /// </summary>
      /// <returns>Metrics object</returns>
      /// <remarks></remarks>
      var oResult = {
         marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
         borderTop: 0, borderBottom: 0, borderLeft: 0, borderRight: 0,
         paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
         boxTop: 0, boxBottom: 0, boxLeft: 0, boxRight: 0
      };
      if (this.length <= 0) return oResult;
      if (this[0] === window) return oResult;

      var borderWidth = $.asInt(this.css("border-width"), 0);

      $.extend(oResult, {
         marginTop: $.asInt(this.css("margin-top"), 0),
         marginBottom: $.asInt(this.css("margin-bottom"), 0),
         marginLeft: $.asInt(this.css("margin-left"), 0),
         marginRight: $.asInt(this.css("margin-right"), 0),
         borderTop: borderWidth,
         borderBottom: borderWidth,
         borderLeft: borderWidth,
         borderRight: borderWidth,
         paddingTop: $.asInt(this.css("padding-top"), 0),
         paddingBottom: $.asInt(this.css("padding-bottom"), 0),
         paddingLeft: $.asInt(this.css("padding-left"), 0),
         paddingRight: $.asInt(this.css("padding-right"), 0)
      });
      $.extend(oResult, {
         boxTop: oResult.marginTop + oResult.borderTop + oResult.paddingTop,
         boxBottom: oResult.marginBottom + oResult.borderBottom + oResult.paddingBottom,
         boxLeft: oResult.marginLeft + oResult.borderLeft + oResult.paddingLeft,
         boxRight: oResult.marginRight + oResult.borderRight + oResult.paddingRight
      });
      return oResult;
   }
   $.fn.sizeControl = function (oOptions) {
      /// <summary>
      /// Controls height, width or both of an element to fill a container.
      /// </summary>
      /// <param name="oOptions" type="object">Control options.</param>
      /// <returns>JQuery object.</returns>
      /// <remarks>See documentation at "http://www.merickson.com/".</remarks>
      var jqElement = this;
      if (jqElement.length <= 0) return this;

      var oStatus = {
         jqElement: jqElement,
         percentWidth: 0,
         percentHeight: 0,
         container: jqElement.parent(),
         rightElement: null,
         rightMargin: 0,
         bottomElement: null,
         bottomMargin: 0,
         OnWindowResize: function (ev) { return true; },
         _onWindowResize: function (ev) {
            var self = this;
            var oCss = {};
            var oPos = self.jqElement.offset();
            var oContainerPos = $(self.container).offset();
            var oContainerBox = $(self.container).layoutBox();

            if (self.percentWidth > 0) {
               var iRightWidth = self.rightElement ? $(self.rightElement).outerWidth() : 0;
               var iMarginWidth = self.jqElement.outerWidth() - self.jqElement.width();
               var iContainerLeft = oContainerPos ? oContainerPos.left : 0;
               oCss.width = (((iContainerLeft + oContainerBox.boxLeft + $(self.container).width()) - (oPos.left + iRightWidth + iMarginWidth + self.rightMargin)) * (self.percentWidth / 100)) + "px";
            }
            if (self.percentHeight > 0) {
               var iBottomHeight = self.bottomElement ? $(self.bottomElement).outerHeight() : 0;
               var iMarginHeight = self.jqElement.outerHeight() - self.jqElement.height();
               var iContainerTop = oContainerPos ? oContainerPos.top : 0;
               oCss.height = (((iContainerTop + oContainerBox.boxTop + $(self.container).height()) - (oPos.top + iBottomHeight + iMarginHeight + self.bottomMargin)) * (self.percentHeight / 100)) + "px";
               // console.log("sizeControl:%s#%s: pos=%d height=%d bot=%d margin=%d conTop=%d conBoxTop=%d conHeight=%d percent=%d newHeight=%s",
               //                         self.jqElement[0].nodeName, self.jqElement[0].id, oPos.top, self.jqElement.height(),
               //                         iBottomHeight, iMarginHeight, iContainerTop, oContainerBox.boxTop, $(self.container).height(), self.percentHeight, oCss.height);
            }
            if (self.OnWindowResize({ status: oStatus, event: ev, css: oCss })) self.jqElement.css(oCss);
            return true;
         }
      };
      $.extend(oStatus, oOptions);

      if ((oStatus.percentWidth > 0) || (oStatus.percentHeight > 0)) {
         $(window).bind('resize.sizeControl', function () { return oStatus._onWindowResize(event); });
         oStatus._onWindowResize(null);
      }
      return this;
   }
   //---------------------------------------------------------------------------------------------
   //emptyTextInput - Manage empty message for a text input field.
   function emptyTextInput(oElement, oOptions) {
      /// <summary>
      /// Element handler for managing empty message of a text input field.
      /// </summary>
      /// <param name="oOptions" type="object">Control options.</param>
      /// <returns></returns>
      /// <remarks></remarks>
      var self = this;
      self.name = "emptyTextInput";
      console.log("emptyTextInput: %s", oElement.name);

      //---------------------------------------------------------------------
      // Define status.
      self.status = {
         // Options to this extension.
         EmptyText: 'search keyword',            // Text to display when input field is empty.
         EmptyClass: null,                       // Class to add when field is empty.

         // Status information.
         jqElement: $(oElement),                 // Original JQuery element.
         hasFocus: false,                        // Indicates field has focus.
         hasEmptyText: false                     // Indicates field is empty.
      };
      $.extend(self.status, oOptions);

      var jqElement = self.status.jqElement;

      try {
         var sOptions = jqElement.attr(self.name);
         if (!$.isBlank(sOptions)) $.extend(self.status, $.JSONparse(sOptions));
      } catch (err) {
         // Ignore errors.
      }

      //---------------------------------------------------------------------
      // Perform edits on status.
      if ($.isBlank(self.status.EmptyClass)) self.status.EmptyClass = null;

      var sValue = jqElement.val();
      if ($.isBlank(sValue) || (sValue == self.status.EmptyText)) {
         jqElement.val(self.status.EmptyText);
         self.status.hasEmptyText = true;
         if (self.status.EmptyClass) jqElement.addClass(self.status.EmptyClass);
      } else {
         self.status.hasEmptyText = false;
         if (self.status.EmptyClass) jqElement.removeClass(self.status.EmptyClass);
      }

      //---------------------------------------------------------------------
      // Define event handlers.
      self._onfocus = function () {
         console.log("emptyTextInput._onfocus: %s", this.name);
         if (self.status.hasEmptyText && (this.value == self.status.EmptyText)) {
            this.value = "";
            self.status.hasEmptyText = false;
         }
         if (self.status.EmptyClass) $(this).removeClass(self.status.EmptyClass);
         self.status.hasFocus = true;
         return true;
      }
      jqElement.bind("focus", self._onfocus);

      self._onblur = function () {
         console.log("emptyTextInput._onblur: %s", this.name);
         if (this.value == "") {
            this.value = self.status.EmptyText;
            self.status.hasEmptyText = true;
            if (self.status.EmptyClass) $(this).addClass(self.status.EmptyClass);
         }
         self.status.hasFocus = false;
         return true;
      }
      jqElement.bind("blur", self._onblur);

      return self;
   }
   $.fn.emptyTextInput = function (oOptions) {
      /// <summary>
      /// Manages empty message for a text input field.
      /// </summary>
      /// <param name="oOptions" type="object">Control options.</param>
      /// <returns></returns>
      /// <remarks></remarks>
      return $.applyPluginHandler(this.filter("input:text"), "emptyTextInput", emptyTextInput, arguments);
   }
   //---------------------------------------------------------------------------------------------
   //setFocus - Support methods.
   function setFocusHandler(jqElements, oOptions) {
      this.tryCount = 0;
      this.maxTry = 10;
      this.intervalWait = 500;
      this.jqElements = jqElements;
      this.onFocus = null;
      this.onError = null;
      this.oElement = null;

      $.extend(this, oOptions);
      this._setFocus();

      return this;
   }
   setFocusHandler.prototype._onFocus = function (ev) {
      var el = ev.srcElement;
      //console.log($.TimeStamp() + ">setFocusHandler._onFocus: element=" + el.outerHTML);
      //console.assert(!el.hasFocus, "onFocus: Already had focus.");
      el.hasFocus = true;
      return true;
   }
   setFocusHandler.prototype._onBlur = function (ev) {
      var el = ev.srcElement;
      //console.log($.TimeStamp() + ">setFocusHandler._onBlur: element=" + el.outerHTML);
      //console.assert(el.hasFocus, "OnBlur: Did not have focus.");
      el.hasFocus = false;
      return true;
   }
   setFocusHandler.prototype.hasFocus = function () {
      return (this.oElement && $.isUndefined(this.oElement.hasFocus)) ? this.oElement.hasFocus : false;
   }
   setFocusHandler.prototype._setFocus = function (oOptions) {
      var self = this;
      self.tryCount += 1;

      //console.log($.TimeStamp() + ">setFocusHandler: try=" + self.tryCount.toString() + ", Options=" + $.DebugStringify(self, 1));
      if (!self.oElement) {
         self.oElement = $(self.jqElements).firstItem();
         if (!self.oElement) {
            if (self.tryCount <= self.maxTry) {
               setTimeout(function () { self._setFocus(); }, 100);
            } else {
               if (self.onError) self.onError(self);
            }
            return false;
         }
         self.tryCount = 0;
      }
      if ($.isUndefined(self.oElement.hasFocus)) {
         self.oElement.hasFocus = false;
         self.oElement.addEventListener('focus', _onFocus, false);
         self.oElement.addEventListener('blur', _onBlur, false);
      }
      if (self.tryCount <= self.maxTry) {
         if (!self.oElement.hasFocus) {
            //console.log($.TimeStamp() + ">setFocusHandler: focus try=" + self.tryCount.toString() + ", element=" + self.oElement.outerHTML);
            self.oElement.focus();
            setTimeout(function () { self._setFocus(); }, self.intervalWait);
            return false;
         } else {
            //console.log($.TimeStamp() + ">setFocusHandler: end try=" + self.tryCount.toString() + ", element=" + self.oElement.outerHTML);
            if (self.onFocus) self.onFocus(self);
            return true;
         }
      } else {
         if (self.oElement.hasFocus) {
            if (self.onFocus) self.onFocus(self);
            return true;
         } else {
            if (self.onError) self.onError(self);
            return false;
         }
      }
   }
   //setFocus - Set focus onto DOM element asyncronously.
   $.fn.setFocus = function (oOptions) {
      /// <summary>
      /// Set focus asynchronously on the first element specified until object is defined and actually get focus or
      /// the specified amount of time has elapsed.
      /// </summary>
      /// <param name="oOptions" type="object">Optional options to control the setFocus operation.</param>
      /// <returns type="boolean">JQuery object.</returns>
      var oHandler = new setFocusHandler(this, oOptions);
      if ($.isObject(oOptions) && $.isDefined(oOptions.handler)) oOptions.handler = oHandler;
      return this;
   }

   //---------------------------------------------------------------------------------------------
   //tocControl - Simple tree view control.

   var tocControlMethods = {
      name: "jQuery.tocControl",
      _sTocControlStatus: "_tocControlStatus",
      _sTocControlClass: "ea-toc-control",
      _bTocInit: true,
      _oEventLock: null,
      init: function (jqObj, oOptions) {
         /// <summary>
         /// Manage each "ul" element in the set of elements as a tree structure.
         /// </summary>
         /// <param name="jqObj" type="object">Element or JQuery object containing element to perform operation on.</param>
         /// <param name="oOptions" type="object">Control options.</param>
         /// <returns>Original JQuery object.</returns>
         /// <remarks>Requires JQuery-UI controls.</remarks>
         var self = this;
         var oStatus = {
            createStyles: true,                             // Indicates default control styles should be generated.
            nodeClosedClass: "ea-toc-closed",               // Class for LI object with children that are closed.
            nodeOpenClass: "ea-toc-open",                   // Class for LI object with children that are closed.
            nodeBulletClass: "ea-toc-bullet",               // Class for LI object with no children.
            nodeSelectedClass: "ea-toc-selected",           // Class added to the selecteed LI object.
            nodeImageClass: "ea-toc-image",                 // Class for inserted SPAN that contains image before LI.
            textWrapClass: "ea-toc-text",                   // Class for span to wrap around LI text for selection purposes.
            openImageClass: "ui-icon-triangle-1-se",        // Class to define open image from JQuery UI.
            closeImageClass: "ui-icon-triangle-1-e",        // Class to define close image from JQuery UI.
            bulletImageClass: "ui-icon-bullet"              // Class to define bullet image from JQuery UI.
         };
         $.extend(oStatus, oOptions);

         oStatus.allImageClasses = oStatus.openImageClass + " " + oStatus.closeImageClass + " " + oStatus.bulletImageClass;

         if (self._bTocInit) {
            self._bTocInit = false;
            self._oEventLock = new $.EventLocker(500);
            if (oStatus.createStyles) {
               var jqRef = $("head");
               if (jqRef.length <= 0) jqRef = $(document.body);
               jqRef.prepend(
                          '<style id="ea-toc-control-css" type="text/css">\n'
                        + '   ul.' + self._sTocControlClass + ' { list-style-type: none; }\n'
                        + '   ul.' + self._sTocControlClass + ' ul { list-style-type: none; }\n'
                        + '   ul.' + self._sTocControlClass + ' li span.' + oStatus.nodeImageClass + ' { cursor:pointer; }\n'
                        + '   ul.' + self._sTocControlClass + ' li span.' + oStatus.textWrapClass + ' { cursor:pointer; }\n'
                        + '   ul.' + self._sTocControlClass + ' li.' + oStatus.nodeClosedClass + ' ul { display:none; }\n'
                        + '</style>\n'
                    );
            }
         }

         jqObj.filter("ul").each(function (idxTree) {
            var jqUL = $(this);
            // Only process a UL that is not a child of an existing TOC UL.
            if (jqUL.parents("ul." + self._sTocControlClass).length <= 0) {
               // Mark this as a IX toc tree.
               jqUL.addClass(self._sTocControlClass).data(self._sTocControlStatus, oStatus);
               // Make sure no child UL is a TOC UL.
               jqUL.find("ul").removeClass(self._sTocControlClass);
               // Define span wrapper for all LI text.
               jqUL.find("li").contents().wrap(function (idx) {
                  return (this.nodeType == $.EHTMLNodeTypes.Text) ? '<span class="' + oStatus.textWrapClass + '" />' : '';
               });
               // Remove all but the first selection.
               jqUL.find("li." + oStatus.nodeSelectedClass + ":gt(0)").removeClass(oStatus.nodeSelectedClass);
               if (jqUL.find("li." + oStatus.nodeSelectedClass).length <= 0)
                  jqUL.find("li:first").addClass(oStatus.nodeSelectedClass);
               // Add bullet image to each list item.
               jqUL.find("li").prepend("<span class='ui-icon " + oStatus.nodeImageClass + " " + oStatus.bulletImageClass + "' style='display:inline;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>");
               // Add closed node class to each list item that has a submenu but no open or close class.
               jqUL.find("li:not(." + oStatus.nodeOpenClass + ", ." + oStatus.nodeClosedClass + "):has(ul)").removeClass(oStatus.nodeBulletClass).addClass(oStatus.nodeClosedClass);
               // Add bullet node class to each list item that has no open, close or bullet class.
               jqUL.find("li:not(." + oStatus.nodeOpenClass + ", ." + oStatus.nodeClosedClass + ", ." + oStatus.nodeBulletClass + ")").addClass(oStatus.nodeBulletClass);
               // Make sure all closed list items that have open children are open.
               jqUL.find("li." + oStatus.nodeClosedClass).has("li." + oStatus.nodeOpenClass).removeClass(oStatus.nodeClosedClass).addClass(oStatus.nodeOpenClass);
               // Define open and close images.
               jqUL.find("li." + oStatus.nodeOpenClass).children("." + oStatus.nodeImageClass).removeClass(oStatus.allImageClasses).addClass(oStatus.openImageClass);
               jqUL.find("li." + oStatus.nodeClosedClass).children("." + oStatus.nodeImageClass).removeClass(oStatus.allImageClasses).addClass(oStatus.closeImageClass);

               //var jqULs = jqUL.add(jqUL.find("ul"));
               jqUL.on("click", "li." + oStatus.nodeOpenClass + " > span." + oStatus.nodeImageClass, function (ev) { $(this).tocControl($.tocControlCommands.close, ev); });
               jqUL.on("click", "li." + oStatus.nodeClosedClass + " > span." + oStatus.nodeImageClass, function (ev) { $(this).tocControl($.tocControlCommands.open, ev); });
               jqUL.on("click", "li", function (ev) { $(this).tocControl($.tocControlCommands.selected, ev); });
            }
         });
         return jqObj;
      },
      error: function (sError, sText) {
         switch (sError) {
            case "commandError":
               $.error('jQuery.tocControl: Command ' + sText + ' does not exist on jQuery.tocControl');
               break;
            default:
               $.error('jQuery.tocControl: Unknown error: ' + sError);
               break;
         }
      },
      open: function (jqObj, ev) {
         /// <summary>
         /// Open each "li" element in list.
         /// </summary>
         /// <param name="jqObj" type="object">Element or JQuery object containing element to perform operation on.</param>
         /// <param name="ev" type="object">Event object.</param>
         /// <returns>Original JQuery object.</returns>
         /// <remarks></remarks>
         var self = this;
         if (self._oEventLock.setLock()) {
            $(jqObj).each(function (idx) {
               var oStatus = $(this).parents("ul." + self._sTocControlClass + ":first").data(self._sTocControlStatus);
               if (oStatus) {
                  var jqLI = $(this).filter("li");
                  if (jqLI.length <= 0) jqLI = $(this).parents("li:first");
                  console.log("tocControl.open: %s", jqLI.text());
                  jqLI.removeClass(oStatus.nodeClosedClass)
                            .addClass(oStatus.nodeOpenClass)
                            .children("." + oStatus.nodeImageClass)
                            .removeClass(oStatus.allImageClasses)
                            .addClass(oStatus.openImageClass);
               }
            });
         }
         return true;
      },
      close: function (jqObj, ev) {
         /// <summary>
         /// Close each "li" element in list.
         /// </summary>
         /// <param name="jqObj" type="object">Element or JQuery object containing element to perform operation on.</param>
         /// <param name="ev" type="object">Event object.</param>
         /// <returns>Original JQuery object.</returns>
         /// <remarks></remarks>
         var self = this;
         if (self._oEventLock.setLock()) {
            $(jqObj).each(function (idx) {
               var oStatus = $(this).parents("ul." + self._sTocControlClass + ":first").data(self._sTocControlStatus);
               if (oStatus) {
                  var jqLI = $(this).filter("li");
                  if (jqLI.length <= 0) jqLI = $(this).parents("li:first");
                  console.log("tocControl.close: %s", jqLI.text());
                  jqLI.removeClass(oStatus.nodeOpenClass)
                            .addClass(oStatus.nodeClosedClass)
                            .children("." + oStatus.nodeImageClass)
                            .removeClass(oStatus.allImageClasses)
                            .addClass(oStatus.closeImageClass);
               }
            });
         }
         return true;
      },
      toggle: function (jqObj, ev) {
         /// <summary>
         /// Toggle open/close status of each "li" element in list.
         /// </summary>
         /// <returns>Original JQuery object.</returns>
         /// <remarks></remarks>
         var self = this;
         if (self._oEventLock.setLock()) {
            $(jqObj).each(function (idx) {
               var oStatus = $(this).parents("ul." + self._sTocControlClass + ":first").data(self._sTocControlStatus);
               if (oStatus) {
                  var jqLI = $(this).filter("li");
                  if (jqLI.length <= 0) jqLI = $(this).parents("li");
                  if (jqLI.hasClass(oStatus.nodeOpenClass)) {
                     jqLI.removeClass(oStatus.nodeOpenClass)
                            .addClass(oStatus.nodeClosedClass)
                            .children("." + oStatus.nodeImageClass)
                            .removeClass(oStatus.allImageClasses)
                            .addClass(oStatus.closeImageClass);
                  } else {
                     jqLI.removeClass(oStatus.nodeClosedClass)
                            .addClass(oStatus.nodeOpenClass)
                            .children("." + oStatus.nodeImageClass)
                            .removeClass(oStatus.allImageClasses)
                            .addClass(oStatus.openImageClass);
                  }
               }
            });
         }
         return true;
      },
      selected: function (jqObj, ev) {
         /// <summary>
         /// Make first element in the list the selected element.
         /// </summary>
         /// <param name="jqObj" type="object">Element or JQuery object containing element to perform operation on.</param>
         /// <param name="ev" type="object">Event object.</param>
         /// <returns>Original JQuery object.</returns>
         /// <remarks></remarks>
         var self = this;
         if (!self._oEventLock.isLocked()) {
            var jqLI = $(jqObj).first().filter("li");
            if (jqLI.length <= 0) jqLI = $(jqObj).parents("li").first();

            var oStatus = $(jqObj).parents("ul." + self._sTocControlClass + ":first").data(self._sTocControlStatus);
            if (oStatus) {
               // Only invoke if method "open" or "close" is not being invoked.
               setTimeout(function () {
                  if (self._oEventLock.setLock()) {
                     jqLI.parents("ul." + self._sTocControlClass).find("li." + oStatus.nodeSelectedClass).not(jqLI).removeClass(oStatus.nodeSelectedClass);
                     jqLI.addClass(oStatus.nodeSelectedClass);
                  }
               });
            }
         }
         return true;
      }
   }
   $.tocControlCommands = {};
   for (var item in tocControlMethods)
      $.tocControlCommands[item] = item;

   $.fn.tocControl = function (sCommand /* as $.tocControlCommands, oOptions */) {
      /// <summary>
      /// Manage a UL list with child UL lists as a TOC tree structure.
      /// </summary>
      /// <param name="sCommand" type="string">One of the TOC commands in enumerated object "$.tocControlCommands".</param>
      /// <param name="oOptions" type="object">Options to command.</param>
      /// <returns></returns>
      /// <remarks></remarks>
      return $.applyPluginSingleton(this, tocControlMethods, arguments);
   }

   return $;
}).call(jQuery, jQuery);

$(function () {
   function valign(jqEl, options) {
      var status = { type: "center", resize: false, margins: [50, 50] };

      if ($.isString(options)) {
         status.type = options;
      } else if ($.isObject(options)) {
         $.extend(status, options);
      }
      status.jqEl = jqEl;

      switch (status.type) {
         case "top": status.margins = [0, 100]; break;
         case "center": case "middle": status.margins = [50, 50]; break;
         case "bottom": status.margins = [100, 0]; break;
      }

      function valignHandler() {
         var height = status.jqEl.height();
         var parentHeight = status.jqEl.parent().height();
         var diff = parentHeight - height;

         status.jqEl.css({
            marginTop: (diff * status.margins[0] / 100).toString() + "px",
            marginBottom: (diff * status.margins[1] / 100).toString() + "px"
         });
      }

      if (status.resize) jqEl.bind({ resize: valignHandler });
      valignHandler();
   }

   function halign(jqEl, options) {
      var status = { jqEl: jqEl, type: "center", resize: false, margins: [50, 50] };

      if ($.isString(options)) {
         status.type = options;
      } else if ($.isObject(options)) {
         $.extend(status, options);
      }

      switch (status.type) {
         case "left": status.margins = [0, 100]; break;
         case "center": case "middle": status.margins = [50, 50]; break;
         case "right": status.margins = [100, 0]; break;
      }

      function halignHandler() {
         var width = status.jqEl.width();
         var parentWidth = status.jqEl.parent().width();
         var diff = parentWidth - width;

         status.jqEl.css({
            marginLeft: (diff * status.margins[0] / 100).toString() + "px",
            marginRight: (diff * status.margins[1] / 100).toString() + "px"
         });
      }

      if (status.resize) jqEl.bind({ resize: halignHandler });
      halignHandler();
   }

   $("[ea-ext]").each(function () {
      var jqEl = $(this);
      var options = $.JSONparse(jqEl.attr("ea-ext"), { errMessage: "Error evaluating attribute 'ea-ext'" });
      for (var item in options) {
         switch (item) {
            case "verticalAlign": valign(jqEl, options[item]); break;
            case "horizontalAlign": halign(jqEl, options[item]); break;
         }
      }
   });
});
