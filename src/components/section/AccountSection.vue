<template>
    <div class="col-lg-9 ps-xl-5">
        <div class="user-panel-title-box">
            <h3>Настройки профиля</h3>
        </div><!-- end user-panel-title-box -->
        <div class="profile-setting-panel-wrap">
            <ul class="nav nav-tabs nav-tabs-s1 nav-tabs-mobile-size" id="myTab" role="tablist">
                <li class="nav-item" role="presentation" v-for="list in SectionData.editProfileData.editProfileTabNav"
                    :key="list.id">
                    <button class="nav-link" :class="list.isActive" :id="list.slug" data-bs-toggle="tab"
                        :data-bs-target="list.bsTarget" type="button">{{ list.title }}</button>
                </li>
            </ul>
            <div class="tab-content mt-4" id="myTabContent">
                <div class="tab-pane fade show active" id="account-information" role="tabpanel"
                    aria-labelledby="account-information-tab">
                    <div class="profile-setting-panel">
                        <h5 class="mb-4">Изменить профиль</h5>
                        <div class="d-flex align-items-center">
                            <div class="image-result-area avatar avatar-3">
                                <img id="image-result" :src="getUser.image || require('@/images/thumb/avatar-9.jpg')" alt="">
                            </div>
                            <input class="upload-image" data-target="image-result" ref="upload" @change="uploadFile" id="upload-image-file" type="file"
                                hidden>
                            <label for="upload-image-file" class="upload-image-label btn">Загрузить фото</label>
                        </div><!-- end d-flex -->
                        <div class="row mt-4">
                            <div class="col-lg-6 mb-3">
                                <label for="displayName" class="form-label">Имя</label>
                                <input type="text" v-model="getUser.first_name" id="displayName"
                                    class="form-control form-control-s1">
                            </div><!-- end col -->
                            <div class="col-lg-6 mb-3">
                                <label for="displayUserName" class="form-label">Фамилия</label>
                                <input type="text" v-model="getUser.last_name" id="displaySursName"
                                    class="form-control form-control-s1">
                            </div><!-- end col -->
                            <div class="col-lg-6 mb-3">
                                <label for="displayUserName" class="form-label">Номер телефона</label>
                                <input type="text" v-model="getUser.phone" id="displayPhone"
                                    class="form-control form-control-s1">
                            </div><!-- end col -->
                        </div><!-- end row -->
                        <button class="btn btn-primary mt-3" @click.prevent="handleSubmitSettings"
                            type="button">Обновить профиль</button>
                    </div><!-- end profile-setting-panel -->
                </div><!-- end tab-pane -->
                <div class="tab-pane fade" id="change-password" role="tabpanel" aria-labelledby="change-password-tab">
                    <div class="profile-setting-panel">
                        <h5 class="mb-4">Изменить пароль</h5>
                        <div class="mb-3">
                            <label for="oldPassword" class="form-label">Старый пароль</label>
                            <div class="position-relative">
                                <input type="password" class="form-control form-control-s1" id="oldPassword"
                                    placeholder="Введите старый пароль">
                                <a href="oldPassword" class="password-toggle" title="Toggle show/hide pasword">
                                    <em class="password-shown ni ni-eye-off"></em>
                                    <em class="password-hidden ni ni-eye"></em>
                                </a>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="newPassword" class="form-label">Новый пароль</label>
                            <div class="position-relative">
                                <input type="password" v-model="newPass" class="form-control form-control-s1" id="newPassword"
                                    placeholder="Введите новый пароль">
                                <a href="newPassword" class="password-toggle" title="Toggle show/hide pasword">
                                    <em class="password-shown ni ni-eye-off"></em>
                                    <em class="password-hidden ni ni-eye"></em>
                                </a>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="confirmNewPassword" class="form-label">Повторите новый пароль</label>
                            <div class="position-relative">
                                <input type="password" v-model="newPassConfirm"  class="form-control form-control-s1" id="confirmNewPassword"
                                    placeholder="Введите новый пароль еще раз">
                                <a href="confirmNewPassword" class="password-toggle" title="Toggle show/hide pasword">
                                    <em class="password-shown ni ni-eye-off"></em>
                                    <em class="password-hidden ni ni-eye"></em>
                                </a>
                            </div>
                        </div>
                        <button class="btn btn-primary mt-3" @click.prevent="handleSubmitPassword"
                            type="button">Обновить пароль</button>
                    </div><!-- end profile-setting-panel -->
                </div><!-- end tab-pane -->

            </div><!-- end tab-content -->
        </div><!-- end profile-setting-panel-wrap-->
    </div><!-- end col-lg-8 -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
import { mapGetters } from 'vuex';
import axios from 'axios'

export default {
    name: 'AccountSection',
    data() {
        return {
            SectionData,
            newPass: '',
            newPassConfirm: '',
            file: null,
        }
    },
    computed: {
        ...mapGetters([
            'getUser',
        ])
    },
    methods: {
        uploadFile() {
            this.file = this.$refs.upload.files[0];
        },
        async handleSubmitSettings() {
            let formData = new FormData();
            formData.append('first_name', this.getUser.first_name);
            formData.append('last_name', this.getUser.last_name);
            formData.append('phone', this.getUser.phone);
            formData.append('image', this.file);
            const response = await axios.post('user/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
            
            if (response.status === 200) {
                alert("Изменения успешно сохранены")
            }
        },
        async handleSubmitPassword() {
            const response = await axios.post('user/update', {
                password: this.newPass,
                password_confirmation: this.newPassConfirm,
            }).catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
            
            if (response.status === 200) {
                alert("Изменения успешно сохранены")
            }
        }
    },
    mounted() {
        /*===========SHOW UPLOADED IMAGE ================== */
        function uploadImage(selector) {
            let elem = document.querySelectorAll(selector)
            if (elem.length > 0) {
                elem.forEach(item => {
                    item.addEventListener('change', function () {
                        if (item.files && item.files[0]) {
                            let img = document.getElementById(item.dataset.target)
                            img.onload = function () {
                                URL.revokeObjectURL(img.src)
                            }
                            img.src = URL.createObjectURL(item.files[0])

                            let allowedExtensions = ['jpg', 'JPEG', 'JPG', 'png']
                            let fileExtension = this.value.split('.').pop()
                            var lastDot = this.value.lastIndexOf('.')
                            var ext = this.value.substring(lastDot + 1)
                            var extTxt = img.value = ext
                            if (!allowedExtensions.includes(fileExtension)) {
                                alert(extTxt + ' file type not allowed, Please upload jpg, JPG, JPEG, or png file')
                                img.src = ' '
                            }
                        }
                    })
                })
            }
        }

        uploadImage('.upload-image')

        /* =========== Show/Hide passoword ============== */
        function showHidePassword(selector) {
            let elem = document.querySelectorAll(selector);
            if (elem.length > 0) {
                elem.forEach(item => {
                    item.addEventListener("click", function (e) {
                        e.preventDefault();
                        let target = document.getElementById(item.getAttribute("href"));
                        if (target.type == "password") {
                            target.type = "text";
                            item.classList.add("is-shown");
                        } else {
                            target.type = "password";
                            item.classList.remove("is-shown");
                        }
                    });

                });
            }
        }

        showHidePassword(".password-toggle");

    }
}
</script>
