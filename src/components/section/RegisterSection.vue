<template>
    <section class="register-section section-space-b pt-4 pt-md-5 mt-md-3">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-lg-6 mb-lg-0 d-none d-lg-block">
                        <img :src="SectionData.registerData.img" alt="" class="img-fluid">
                    </div><!-- end col-lg-6 -->
                    <div class="col-lg-6 col-md-9">
                        <div class="section-head-sm">
                            <h2 class="mb-2" v-html="'Регистрация в Invest UP'"></h2>
                            <p>Заполните поля чтобы зарегистрирововаться</p>
                        </div>
                        <form action="#" @submit.prevent="submit">
                            <div class="form-floating mb-4">
                                <input type="text" class="form-control" v-model="first_name" id="name" placeholder="Имя">
                                <label for="name">Имя</label>
                            </div><!-- end form-floating -->
                            <div class="form-floating mb-4">
                                <input type="text" class="form-control" v-model="last_name" id="last_name" placeholder="Фамилия">
                                <label for="last_name">Фамилия</label>
                            </div><!-- end form-floating -->
                            <div class="form-floating mb-4">
                                <input type="number" class="form-control" v-model="phone" id="phone" placeholder="Номер">
                                <label for="Phone">Номер</label>
                            </div><!-- end form-floating -->
                            <div class="form-floating mb-4">
                                <input type="email" class="form-control" v-model="email" id="emailAddress" placeholder="name@example.com">
                                <label for="emailAddress">Почта</label>
                            </div><!-- end form-floating -->
                            <div class="form-floating mb-4">
                                <input type="password" class="form-control password" v-model="password" id="password" placeholder="Пароль">
                                <label for="password">Пароль</label>
                                <a href="password" class="password-toggle" title="Toggle show/hide pasword">
                                    <em class="password-shown ni ni-eye-off"></em>
                                    <em class="password-hidden ni ni-eye"></em>
                                </a>
                            </div><!-- end form-floating -->
                            <p class="mb-4 form-text" >Регистрируясь вы соглашаетесь на наши условия использования</p>
                            <button class="btn btn-primary w-100" type="submit">Создать аккаунт</button>
                            <span class="d-block my-4">— или зарегистрирововать с помощью —</span>
                            <ul class="btns-group d-flex">
                                <li class="flex-grow-1" v-for="(list, i) in SectionData.registerData.btns" :key="i"><router-link :to="list.path" class="btn d-block" :class="list.btnClass"><em class="ni" :class="list.icon"></em> {{ list.title }} </router-link></li>
                            </ul>
                            <p class="mt-3 form-text">Уже есть аккаунт? <router-link :to="SectionData.registerData.btnTextLink" class="btn-link">Войти</router-link></p>
                        </form>
                    </div><!-- end col-lg-6 -->
                </div><!-- end row -->
            </div><!-- end container -->
        </section><!-- end register-section -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
export default {
  name: 'RegisterSection',
  data: () => ({
    SectionData,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: ''
  }),
  mounted () {
    /*  ======== Show/Hide passoword ======== */
    function showHidePassword(selector){
        let elem = document.querySelectorAll(selector);
        if(elem.length > 0){
            elem.forEach(item => {
                item.addEventListener("click", function(e){
                    e.preventDefault();
                    let target = document.getElementById(item.getAttribute("href"));
                    if(target.type == "password") {
                    target.type = "text";
                    item.classList.add("is-shown");
                    }else{
                    target.type = "password";
                    item.classList.remove("is-shown");
                    }
                });
            });
        }
    }
    showHidePassword(".password-toggle");
  },
  methods: {
    async submit() {
        try {
            await this.$store.dispatch('register', {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                phone: this.phone,
                password: this.password,
                password_confirmation: this.password,
            });
            this.$router.push('/')
        } catch (e) {
            console.log(e);
        }
    } 
  }
}
</script>