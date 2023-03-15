<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-4 col-md-6">
        <NuxtLink to="/" class="btn btn-primary">Kembali</NuxtLink>
      </div>
      <div class="col-8 col-md-6 d-flex justify-content-end">
        <div v-if="suratSebelumnya">
          <NuxtLink
            :to="`/surat/${suratSebelumnya.nomor}`"
            class="btn btn-primary"
          >
            {{ suratSebelumnya.namaLatin }}</NuxtLink
          >
        </div>
        <div v-if="suratSelanjutnya">
          <NuxtLink
            :to="`/surat/${suratSelanjutnya.nomor}`"
            class="btn btn-primary ms-2"
            >{{ suratSelanjutnya.namaLatin }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="row my-4" v-if="surat">
      <div class="col-12">
        <div class="card card-margin">
          <div class="card-body text-center">
            <div class="list">
              <div class="list-title-wrapper">
                <div class="list-info">
                  <h5 class="list-title fw-bold mb-1">
                    {{ surat.namaLatin }} (<span class="text-arabic">{{
                      surat.nama
                    }}</span
                    >)
                  </h5>
                  <span class="list-desc">{{ surat.arti }}</span>
                  <span
                    class="list-desc text-dark border-top mt-3 pt-3"
                    v-html="surat.deskripsi"
                  ></span>

                  <div class="d-flex justify-content-center mt-4">
                    <div>
                      <NuxtLink
                        :to="`/tafsir/${surat.nomor}`"
                        class="btn btn-primary me-2"
                        >Tafsir</NuxtLink
                      >
                    </div>
                    <div>
                      <button
                        class="btn btn-primary"
                        @click="playAudio(surat.audioFull['05'])"
                      >
                        {{
                          isPlaying && currentAudio === surat.audioFull["05"]
                            ? "Hentikan Audio"
                            : "Putar Audio"
                        }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card card-margin">
          <div class="card-body text-center py-2">
            Klik pada teks arab untuk mendengarkan audio per-ayat.
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card card-margin">
          <div class="card-body text-center">
            <div class="list-info w-100 my-2">
              <h2 class="list-title text-arabic ms-auto">
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12" v-for="(ayat, index) in surat.ayat" :key="index">
        <div class="card card-margin">
          <div class="card-body">
            <div class="list">
              <div class="list-title-wrapper">
                <div class="list-number-success">
                  <span class="list-number">{{ ayat.nomorAyat }}</span>
                </div>
                <div class="list-info w-100 my-2">
                  <h2
                    class="list-title text-arabic ms-auto"
                    @click="playAudio(ayat.audio['05'])"
                  >
                    {{ ayat.teksArab }}
                  </h2>
                  <span class="text-dark list-desc my-2 ms-auto">{{
                    ayat.teksLatin
                  }}</span>
                  <i class="text-dark list-desc border-top mt-3 pt-3"
                    >"{{ ayat.teksIndonesia }}"</i
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-4" v-else>
      <div class="col-12">
        <div class="card">
          <div class="card-body text-center">Memuat...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      surat: null,
      suratSelanjutnya: null,
      suratSebelumnya: null,
      isPlaying: false,
      currentAudio: null,
    };
  },
  methods: {
    async getSurat() {
      fetch(`https://equran.id/api/v2/surat/${this.$route.params.nomor}`)
        .then((response) => response.json())
        .then((response) => {
          this.surat = response.data;
          this.suratSelanjutnya = response.data.suratSelanjutnya;
          this.suratSebelumnya = response.data.suratSebelumnya;
        });
    },
    playAudio(audioFile) {
      if (audioFile) {
        if (this.currentAudio && this.currentAudio !== audioFile) {
          this.stopAudio();
        }
        if (!this.isPlaying || this.currentAudio !== audioFile) {
          this.currentAudio = audioFile;
          this.audio = new Audio(audioFile);
          this.audio.play();
          this.isPlaying = true;
          this.audio.addEventListener("ended", () => {
            this.isPlaying = false;
          });
        } else {
          this.stopAudio();
        }
      }
    },
    stopAudio() {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.currentAudio = null;
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.params.nomor !== from.params.nomor) {
        this.stopAudio();
      }
    },
  },
  mounted() {
    this.getSurat();
  },
};
</script>
