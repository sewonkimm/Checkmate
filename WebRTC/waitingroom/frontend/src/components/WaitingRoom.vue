<template>
  <div style="margin:80px">
    <v-row>
      <v-col
        cols="3"
        md="3"
        v-for="item in items"
        v-bind:key="item.roomId"
        style="padding-left: 2%"
      >
        <v-card class="pa-3" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="'https://k4a1061.p.ssafy.io/' + item.roomType + '.png'"
            style="opacity:0.8"
          >
          </v-img>
          <v-card-title color="blue"
            ><h3>{{ item.roomName }}</h3></v-card-title
          >
          <v-card-subtitle class="pb-1 ">{{ item.roomType }}</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ item.roomContent }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              justify="center"
              color="primary"
              elevation="2"
              text
              @click="enterRoom(item.roomUuid)"
            >
              입장하기
            </v-btn>

            <v-btn
              justify-content="center"
              color="primary"
              elevation="2"
              text
              @click="copy(item.roomUuid)"
            >
              공유하기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WaitingRoom",
  created() {
    this.getRoomList();
  },

  data() {
    return {
      items: [],
      roomName: "",
      roomType: "",
      roomContent: "",
    };
  },
  methods: {
    getRoomList: function() {
      axios({
        url: "https://k4a1061.p.ssafy.io/api/chat/rooms",
        method: "GET",
      })
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    enterRoom: function(uuid) {
      var link = "https://k4a1061.p.ssafy.io:3030/" + uuid;
      window.open(link);
    },
    close: function() {
      location.reload(true);
    },
  },
};
</script>
