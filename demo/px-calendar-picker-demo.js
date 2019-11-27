/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import '../px-calendar-picker.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Header -->
    <px-demo-header module-name="px-calendar-picker" description="The px-calendar-picker component renders a calendar for a given decade, year, or month, and allows users to select a date or range from the calendar. One main use of this component is in the px-range-panel." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}" config="[[chosenConfig]]" class="flex__item flex__item--msfix"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component">
        <template is="dom-if" if="{{props.preventRangeSelection.value}}">
          <p class="u-mb0">Event fired: <strong>px-calendar-selected</strong></p>
          <p class="zeta u-mt0">See API Reference below for more details</p>
          <p class="u-mb++">Submitted date: <strong>{{props.fromMoment.value}}</strong></p>

        </template>

        <template is="dom-if" if="{{!props.preventRangeSelection.value}}">
          <p class="u-mb0">Event fired: <strong>px-calendar-range-selected</strong></p>
          <p class="zeta u-mt0">See API Reference below for more details</p>
          <p class="u-mb++">Submitted range: <strong>{{props.fromMoment.value}}</strong> To: <strong>{{props.toMoment.value}}</strong></p>

        </template>

        <div style="width:210px">
          <px-calendar-picker from-moment="{{props.fromMoment.value}}" to-moment="{{props.toMoment.value}}" display-mode="{{props.displayMode.value}}" block-future-dates="{{props.blockFutureDates.value}}" block-past-dates="{{props.blockPastDates.value}}" prevent-range-selection="{{props.preventRangeSelection.value}}" hide-next-button="{{props.hideNextButton.value}}" hide-previous-button="{{props.hidePreviousButton.value}}" shrink="{{props.shrink.value}}" min-date="{{props.minDate.value}}" max-date="{{props.maxDate.value}}">
          </px-calendar-picker>
        </div>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-calendar-picker" links-includes="[[linksIncludes]]" suppress-property-values="[[suppressPropertyValues]]">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-calendar-picker" hide="[[hideEvents]]"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-calendar-picker-demo',

  properties: {

    /**
    * Note: The actual data/values for `props` are placed in `this.demoProps`
    * to create a static reference that Polymer shouldn't overwrite.
    *
    * On object containing all the properties the user can configure for this
    * demo. Usually a pretty similar copy of the component's `properties` block
    * with some additional sugar added to describe what kind of input the
    * user will be shown and how that input should be configured.
    *
    * Note that `value` for each property is the default that will be set
    * unless a config from `configs` is applied by default.
    *
    *
    * @property demoProps
    * @type {Object}
    */
    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },
    suppressPropertyValues: {
      type: Array,
      value: function() { return ['toMoment', 'fromMoment']; }
    },

    hideEvents: {
      type: Array,
      value: ["px-datetime-range-submitted"]
    },

    /**
    * An array of pre-configured `props` that can be used to provide the user
    * with a set of common examples. These configs will be made available
    * as a set of tabs the user can click that will automatically change
    * the `props` to specific values.
    *
    * @property configs
    * @type {Array}
    */
    configs: {
      type: Array,
      value: function(){
        return [
          { configName: "Default",
          configReset: true },

          { configName: "Future dates",
          displayMode: this.demoProps.displayMode.inputChoices[0],
          preventRangeSelection: false,
          blockFutureDates: false,
          blockPastDates: true,
          hideNextButton: false,
          hidePreviousButton: false,
          shrink: false,
          parentComponent: ["<div style='width:210px'>", "</div>"] },

          { configName: "Single date",
          displayMode: this.demoProps.displayMode.inputChoices[0],
          preventRangeSelection: true,
          blockFutureDates: false,
          blockPastDates: false,
          hideNextButton: false,
          hidePreviousButton: false,
          shrink: false,
          parentComponent: ["<div style='width:210px'>", "</div>"] },

          { configName: "Show months",
          displayMode: this.demoProps.displayMode.inputChoices[1],
          preventRangeSelection: false,
          blockFutureDates: false,
          blockPastDates: false,
          hideNextButton: false,
          hidePreviousButton: false,
          shrink: false,
          parentComponent: ["<div style='width:210px'>", "</div>"] }
        ]
      }
    }
  },

  /**
  * A reference for `this.props`. Read the documentation there.
  */
  demoProps: {
    preventRangeSelection: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    blockFutureDates: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    blockPastDates: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    hideNextButton: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    hidePreviousButton: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    shrink: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    displayMode: {
      type: String,
      defaultValue: 'day',
      inputType: 'dropdown',
      inputChoices: ['day', 'month', 'year']
    },

    minDate: {
      type: String,
      defaultValue: Px.moment().subtract(3, 'month').toISOString(),
      inputType: 'text',
      inputPlaceholder: 'ISOString'
    },

    maxDate: {
      type: String,
      defaultValue: Px.moment().add(3, 'month').toISOString(),
      inputType: 'text',
      inputPlaceholder: 'ISOString'
    },

    fromMoment: {
      type: Object,
      defaultValue: null
    },

    toMoment: {
      type: Object,
      defaultValue: null
    }
  },

  ready: function () {
    this.linksIncludes = ['px-datetime-common/px-polygit-imports-datetime.html', 'px-icon-set/px-icon-set.html', 'px-icon-set/px-icon.html'];
  }
});
