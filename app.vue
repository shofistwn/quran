<template>
  <div>
    <NuxtLoadingIndicator />
    <Navbar />
    <main>
      <NuxtPage />
    </main>
    <Footer />

    <button class="to-top-btn" @click="scrollToTop">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#FFF"
          d="M12.707 7.293l4.5 4.5a1 1 0 0 1-1.414 1.414L13 9.414V19a1 1 0 1 1-2 0V9.414l-2.793 2.793a1 1 0 1 1-1.414-1.414l4.5-4.5a1 1 0 0 1 1.414 0z"
        />
      </svg>
    </button>
  </div>
</template>

<style>
body {
  background: #f4f7fd;
  font-family: "Noto Sans", sans-serif;
}

main {
  min-height: 100vh;
}

.card-margin {
  margin-bottom: 1.875rem;
}

.card {
  border: 0;
  box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
  -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #ffffff;
  background-clip: border-box;
  border: 1px solid #e6e4e9;
  border-radius: 8px;
}

.card .card-header.no-border {
  border: 0;
}
.card .card-header {
  background: none;
  padding: 0 0.9375rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  min-height: 50px;
}
.card-header:first-child {
  border-radius: calc(8px - 1px) calc(8px - 1px) 0 0;
}

.list .list-title-wrapper {
  display: flex;
  align-items: center;
}

.list .list-title-wrapper .list-number-success {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e8faf8;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.list .list-title-wrapper .list-number-success .list-number {
  color: #17d1bd;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.list .list-title-wrapper .list-info {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.list .list-title-wrapper .list-info .list-title {
  color: #3c4142;
}

.list .list-title-wrapper .list-info .list-desc {
  color: #b1bac5;
}

.text-arabic {
  font-family: "Noto Naskh Arabic", serif;
}

.btn-primary {
  background-color: #28a745;
  border: #28a745;
}

.btn-primary:hover {
  background-color: #28a745;
  border: #28a745;
  opacity: 0.8;
}

.to-top-btn {
  position: fixed;
  bottom: 30px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: rgba(128, 128, 128, 0.3);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.to-top-btn:hover {
  opacity: 0.8;
}
</style>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>
