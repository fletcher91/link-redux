/* eslint no-magic-numbers: 0 */
import "../../__tests__/useHashFactory";

import { mount, shallow } from "enzyme";
import { defaultNS, LinkedRenderStore } from "link-lib";
import React from "react";

import * as ctx from "../../__tests__/helpers/fixtures";
import { Type } from "../Type";

function createComponent(className: string): React.ComponentType {
    return () => React.createElement("span", { className });
}

describe("Type component", () => {
    it("renders null when type is not present", () => {
        const opts = ctx.empty();

        const elem = shallow(opts.wrapComponent(React.createElement(Type)));

        expect(elem.find("span")).not.toExist();
    });

    it("renders no view when no class matches", () => {
        const opts = ctx.fullCW(undefined);

        const elem = mount(opts.wrapComponent(React.createElement(Type)));

        expect(elem.find("div.no-view")).toExist();
    });

    it("renders default when set", () => {
        const opts = ctx.type(undefined);
        opts.lrs.registerAll(LinkedRenderStore.registerRenderer(
            createComponent("thing"),
            defaultNS.schema("Thing"),
        ));

        const elem = mount(opts.wrapComponent(React.createElement(Type)));

        expect(elem.find("span")).toHaveClassName("thing");
    });

    it("renders the registered class", () => {
        const opts = ctx.fullCW();
        opts.lrs.registerAll(LinkedRenderStore.registerRenderer(
            createComponent("creativeWork"),
            defaultNS.schema("CreativeWork"),
        ));

        const elem = mount(opts.wrapComponent(React.createElement(Type)));

        expect(elem.find(".creativeWork")).toExist();
    });
});
