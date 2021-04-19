import Head from 'next/head';
import { useEffect, useState } from 'react';
import serverRoute from '../utils/serverRoute';
import axios from 'axios';

export default function DataExtensionTable(props){
    return (
        <table class="slds-table slds-table_cell-buffer slds-table_bordered">
  <thead>
    <tr class="slds-line-height_reset">
      <th class="" scope="col">
        <div class="slds-truncate" title="Name">
          Name
        </div>
      </th>
      <th class="" scope="col">
        <div class="slds-truncate" title="Customer Key">Customer Key</div>
      </th>
      <th class="" scope="col">
        <div class="slds-truncate" title="Date Created">Date Created</div>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr class="slds-hint-parent">
      <th data-label="Name" scope="row">
        <div class="slds-truncate" title="Name">DE 1</div>
      </th>
      <td data-label="Customer Key">
        <div class="slds-truncate" title="Customer Key">asd123-123c-12df-g551</div>
      </td>
      <td data-label="Date Created">
        <div class="slds-truncate" title="4/14/2015">4/14/2015</div>
      </td>
    </tr>
    <tr class="slds-hint-parent">
      <th data-label="Name" scope="row">
        <div class="slds-truncate" title="Name">DE 2</div>
      </th>
      <td data-label="Customer Key">
        <div class="slds-truncate" title="Customer Key">98182-luqc-p136-jh32</div>
      </td>
      <td data-label="Date Created">
        <div class="slds-truncate" title="4/15/2020">4/15/2020</div>
      </td>
    </tr>
  </tbody>
</table>
    )
}