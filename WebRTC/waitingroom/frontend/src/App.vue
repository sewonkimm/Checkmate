<template>
  <v-app>
    <v-app-bar app color="#0F16F8" dark style="height:58px"> </v-app-bar>
    <div style="max-height:200px">  
      <a href="https://k4a106.p.ssafy.io" style="cursor:default">
        <v-img
          alt="CheckMate Logo"
          contain
          src="./assets/checkmate_logo.png"
          width="70"
          style="padding-top:200px; margin-left:50px;"
      /></a>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#0F16F8"
            dark
            v-bind="attrs"
            v-on="on"
            style="height:50px; max-width:600px; display: block; margin: 0px 100px 100px auto; transform: scale(1) translate(45%, -315%)"
          >
            <h2>방 생성하기</h2>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">방 생성하기</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="방 제목"
                    required
                    v-model="roomName"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="['언어교환', '스터디', '자유', '친구']"
                    label="카테고리"
                    v-model="roomType"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#F016DE" submit @click="close"
              ><h3 style="color:white">이전</h3></v-btn
            >
            <v-btn color="#0F16F8" submit @click="createRoom"
              ><h3 style="color:white">생성</h3></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
  
   
    </div>

    <v-main style="padding:0px">
      <WaitingRoom />
    </v-main>
  </v-app>
</template>

<script>
import WaitingRoom from "./components/WaitingRoom";
import axios from "axios";

export default {
  name: "App",

  components: {
    WaitingRoom,
  },
  methods: {
    enterRoom: function(uuid) {
      var link = "https://k4a1061.p.ssafy.io:3030/" + uuid;
      window.open(link);
    },
    close: function() {
      location.reload(true);
    },
    createRoom: function() {
      axios({
        url: "https://k4a1061.p.ssafy.io/api/chat/room",
        method: "POST",
        data: {
          roomName: this.roomName,
          roomType: this.roomType,
        },
      })
        .then(() => {
          history.go(0);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  data: () => ({
    //
  }),
};
</script>
