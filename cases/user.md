```ts
// creata user base
const userSettings = UserSettingsEntity.getDefaultSettings;
const userEntity = new UserEntity({ name, password, role }, this.bcryptService);

const createdUser = await prismaService.user.create({
    data: {
        name: `test_${new Date()}`,
        password: `test_${Date.now()}`,
        settings: {create: {}},
        wallet: {create: {}},
    },
    include: {wallet: true, settings: true},
});
```


