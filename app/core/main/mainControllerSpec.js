/* global expect */

"use strict";

describe("MainController", function () {
    var controller, vm;

    beforeEach(module("app.main"));

    beforeEach(inject(function ($controller, $http) {
        controller = $controller("MainController", {});
        vm = controller;
    }));

    it("should be defined", function () {
        expect(controller).toBeDefined();
    });
});
