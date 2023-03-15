<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
        <div class="card card-margin">
          <div class="card-body p-0">
            <input
              type="text"
              class="form-control form-control-lg py-3"
              placeholder="Masukkan nama atau arti surat"
              v-model="searchSurat"
            />
          </div>
        </div>
      </div>

      <div class="col-lg-4" v-for="(surat, index) in daftarSurat" :key="index">
        <NuxtLink
          :to="`/surat/${surat.nomor}`"
          class="card card-margin text-decoration-none"
        >
          <div class="card-body">
            <div class="list">
              <div class="list-title-wrapper">
                <div class="list-number-success">
                  <span class="list-number">{{ surat.nomor }}</span>
                </div>
                <div class="list-info">
                  <h5 class="list-title fw-bold mb-1">
                    {{ surat.namaLatin }} ({{ surat.jumlahAyat }})
                  </h5>
                  <span class="list-desc">{{ surat.arti }}</span>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchSurat: "",
      daftarSurat: [],
    };
  },
  methods: {
    getSurat() {
      fetch("https://equran.id/api/v2/surat")
        .then((response) => response.json())
        .then((response) => {
          this.daftarSurat = response.data;
        });
    },
  },
  watch: {
    searchSurat() {
      const keyword = this.searchSurat;
      if (keyword.length > 0) {
        fetch("https://equran.id/api/v2/surat")
          .then((response) => response.json())
          .then((response) => {
            this.daftarSurat = response.data.filter((surat) => {
              return (
                surat.namaLatin.toLowerCase().includes(keyword.toLowerCase()) ||
                surat.arti.toLowerCase().includes(keyword.toLowerCase())
              );
            });
          });
      } else {
        this.getSurat();
      }
    },
  },
  mounted() {
    this.getSurat();
  },
};
</script>
