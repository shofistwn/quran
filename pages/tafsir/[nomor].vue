<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12 col-md-6">
        <NuxtLink to="/" class="btn btn-primary">Kembali</NuxtLink>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
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
                        :to="`/surat/${surat.nomor}`"
                        class="btn btn-primary me-2"
                        >Surat</NuxtLink
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12" v-for="(tafsir, index) in surat.tafsir" :key="index">
        <div class="card card-margin">
          <div class="card-body">
            <div class="list">
              <div class="list-title-wrapper">
                <div class="list-number-success">
                  <span class="list-number">{{ tafsir.ayat }}</span>
                </div>
                <div class="list-info w-100 my-2">
                  <i class="text-dark list-desc">"{{ tafsir.teks }}"</i>
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
          <div class="card-body text-center">Loading...</div>
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
    };
  },
  methods: {
    async getSurat() {
      fetch(`https://equran.id/api/v2/tafsir/${this.$route.params.nomor}`)
        .then((response) => response.json())
        .then((response) => {
          this.surat = response.data;
          this.suratSelanjutnya = response.data.suratSelanjutnya;
          this.suratSebelumnya = response.data.suratSebelumnya;
          console.log(response.data);
        });
    },
  },
  mounted() {
    this.getSurat();
  },
};
</script>
