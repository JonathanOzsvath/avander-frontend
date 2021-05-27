<template>
  <v-container>
    <v-dialog
        v-model="dialog"
        max-width="500"
    >
      <v-card>
        <v-card-title class="headline">
          Selected Measurement Id: {{ dialogMeasurement.id }}
        </v-card-title>

        <v-card-text>
          <p>Vehicle: {{dialogMeasurement.vehicle}}</p>
          <p>Shop: {{dialogMeasurement.shop}}</p>
          <p>Measurement Point: {{dialogMeasurement.measurementPoint}}</p>
          <p>Date: {{dialogMeasurement.date}}</p>
          <p>Gap: {{dialogMeasurement.gap}}</p>
          <p>Flush: {{dialogMeasurement.flush}}</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col md="3">
        <v-text-field
            label="Vehicle Filter"
            outlined
            hide-details
            v-model="vehicleSearch"
            @input="searchUpdate"
        ></v-text-field>
      </v-col>

      <v-col md="3">
        <v-select
            v-model="shopSearch"
            :items="shopSearchItems"
            outlined
            item-text="name"
            item-value="id"
            label="Shop Filter"
            @change="searchUpdate"
        ></v-select>
      </v-col>

      <v-col md="3">
        <v-text-field
            label="Measurement Point Filter"
            outlined
            hide-details
            v-model="measurementPoint"
            @input="searchUpdate"
        ></v-text-field>
      </v-col>

      <v-col md="3">
        <v-menu
            ref="menu"
            :close-on-content-click="false"
            :return-value.sync="dates"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="dates"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="dates"
              no-title
              scrollable
              range
              @change="datePickerUpdate"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-data-table
        :page="page"
        :pageCount="numberOfPages"
        :headers="headers"
        :items="measurementList"
        :options.sync="options"
        :server-items-length="totalPassengers"
        :loading="loading"
        class="elevation-1"
        @click:row="clickedRow"
        @pagination="searchUpdate"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import {getMeasurements} from "@/axios/measurements";
import {getShops} from "@/axios/shops";

export default {
  name: 'Home',
  components: {},
  created() {
    this.getShops();
  },
  data() {
    return {
      page: 1,
      totalPassengers: 0,
      numberOfPages: 0,
      loading: true,
      options: {page: 1, itemsPerPage: 5},
      measurementList: [],
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Vehicle', align: 'start', value: 'vehicle'},
        {text: 'Shop', value: 'shop'},
        {text: 'MeasurementPoint', value: 'measurementPoint'},
        {text: 'Date', value: 'date'},
        {text: 'Gap', value: 'gap'},
        {text: 'Flush', value: 'flush'},
      ],
      vehicleSearch: '',
      shopSearch: '',
      shopSearchItems: [],
      measurementPoint: '',
      dates:[],
      dialog: false,
      dialogMeasurement: ''
    }
  },
  methods: {
    datePickerUpdate(){
      this.$refs.menu.save(this.dates)
      this.getMeasurements();
    },
    searchUpdate(){
      this.getMeasurements();
    },
    getShops(){
      getShops()
      .then(data => {
        const emptyItem = {
          id: '',
          name: '-----------',
        }
        this.shopSearchItems.push(emptyItem);

        for (let item in data) {
          if (Object.prototype.hasOwnProperty.call(data, item)) {
            const shopSearchItem = {
              id: data[item].id,
              name: data[item].name,
            }

            this.shopSearchItems.push(shopSearchItem);
          }
        }
      })
    },
    getMeasurements() {
      this.loading = true;
      const {page, itemsPerPage} = this.options;
      console.log("Page Number ", page, itemsPerPage);

      var parameters = `?pageNumber=${page}&pageSize=${itemsPerPage}`;

      if (this.vehicleSearch !== '') {
        parameters += `&vehicle=${this.vehicleSearch}`
      }

      if (this.shopSearch !== '') {
        parameters += `&shop=${this.shopSearch}`
      }

      if (this.measurementPoint !== '') {
        parameters += `&measurementpoint=${this.measurementPoint}`
      }

      if (this.dates.length === 2) {
        console.log(this.dates.toString());
        parameters += `&dates=${this.dates.toString()}`
      }

      getMeasurements(parameters)
          .then(response => {
            console.log(response);
            this.loading = false;

            this.measurementList = []

            for (let item in response.data) {
              if (Object.prototype.hasOwnProperty.call(response.data, item)) {
                const measurement = {
                  id: response.data[item].id,
                  vehicle: response.data[item].vehicle.jsn,
                  shop: response.data[item].shop.name,
                  measurementPoint: response.data[item].measurementPoint.name,
                  date: response.data[item].date,
                  gap: response.data[item].gap,
                  flush: response.data[item].flush,
                }
                this.measurementList.push(measurement);
              }
            }

            let paginationInfo = JSON.parse(response.headers["x-pagination"]);

            this.totalPassengers = paginationInfo["TotalCount"];
          });
    },
    clickedRow(i) {
      this.dialog = true;
      this.dialogMeasurement = i;
    },
  }
}
</script>
