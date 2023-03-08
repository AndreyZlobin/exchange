      // const id = "6404d5d35fd4045be09d3f8e";
      //
      // const user = await prismaService.user.findUnique({
      //   where: { id },
      //   // include: { orders: true },
      // });
      //
      // console.log(user);

      // const payment = await prismaService.paymentSystem.findMany();

      // console.log(payment);
      const orderId = "6406ba072af0eeef076e67dd"; // deleted
      // const orderId = "6406b9ce78c2d85c795e55a0";
      const uniqueOrder = await prismaService.order.findUnique({
        where: { id: orderId },
      });

      console.log(uniqueOrder);

      // const newOrder = await prismaService.order.create({
      //   data: {
      //     userId: id,
      //     paymentSystemId: payment.id,
      //     status: "new",
      //   },
      //   include: { user: true, paymentSystem: true },
      // });

      // const orders = await prismaService.order.findMany({
      //   include: { user: true, paymentSystem: true },
      // });

      // const orders = await prismaService.order.findMany({ where: { status: "new" } });
      // const orders = await prismaService.order.findMany();
      // const orders = await prismaService.order.findMany({ where: { deleted: true } });
      // const orders = await prismaService.order.findMany({
      //   where: { status: "new", deleted: false },
      // });
      // const orders = await prismaService.order.findMany();

      // console.log(orders);

      // console.log(orders);
      // console.log(uniqueOrder);
      // const updatedOrder = await prismaService.order.update({
      //   where: { id: orderId },
      //   data: {
      //     status: "renew",
      //     statusHistory: [...new Set([...uniqueOrder.statusHistory, "renew"])] as OrderStatus[],
      //   },
      // });

      // console.log(updatedOrder);

      // console.log(newOrder);
      // const defaultWallet = {
      //   balance: 0,
      //   balanceDep: 0,
      //   address: "",
      //   walletDepositCheckAmount: 0,
      // };

      // const user = await prismaService.user.create({
      //   data: {
      //     active: true,
      //     name: "Test2",
      //     password: "test3",
      //     wallet: { create: defaultWallet },
      //     paymentSetting: {
      //       create: {
      //         systems: {
      //           card: {
      //             type: "card",
      //             min: 300,
      //             max: 15000,
      //             brokerCommission: 0,
      //             systemCommission: 20,
      //             isAllow: false,
      //           },
      //           sim: {
      //             type: "sim",
      //             min: 300,
      //             max: 15000,
      //             brokerCommission: 0,
      //             systemCommission: 20,
      //             isAllow: false,
      //           },
      //           qiwi: {
      //             type: "qiwi",
      //             min: 300,
      //             max: 15000,
      //             brokerCommission: 0,
      //             systemCommission: 20,
      //             isAllow: false,
      //           },
      //           yandex: {
      //             type: "yandex",
      //             min: 300,
      //             max: 15000,
      //             brokerCommission: 0,
      //             systemCommission: 20,
      //             isAllow: false,
      //           },
      //         },
      //       },
      //     },
      //   },
      //   include: { paymentSetting: true },
      // });

      //
      // const userId = "6404387a91f583f46c70840b";
      // const user = await prismaService.user.findUnique({
      //   where: { id: "6404300174d68d6ae002fad4" },
      //   include: { wallet: true, orders: true, _count: true, paymentSetting: true },
      // });

      // const payment = await prismaService.paymentSetting.findUnique({ where: { userId } });

      // const user = await prismaService.user.delete({
      //   where: { id: "6402fc5c51519026d5ed9a7b" },
      //   include: { wallet: true, orders: true },
      // });

      // const user = await prismaService.user.findMany();

      // const user = await prismaService.user.deleteMany();
      //
      // console.log(user);
      // console.log(user);
      // console.log(payment);
