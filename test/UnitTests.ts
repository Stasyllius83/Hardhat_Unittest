import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

describe("Payments", async function () {
  const { viem } = await network.connect();
  const owner = await viem.getPublicClient();

  it("Should set a message for payment using memory", async function () {
    const payments = await viem.deployContract("Payments");
    const _message = "Happy New year!";

    await payments.write.setMessageMemo([0, _message]);

    const Payment = await payments.read.getPayments([0]);

    assert.equal(_message, Payment.message);
  });

  it("Should set a message for payment using calldata", async function () {
    const payments = await viem.deployContract("Payments");
    const _message = "Happy New year!";

    await payments.write.setMessageCall([0, _message]);

    const Payment = await payments.read.getPayments([0]);

    assert.equal(_message, Payment.message);
  });

  it("Should square the elements of the array using memory", async function () {
    const payments = await viem.deployContract("Payments");
    const arr = [1n, 2n, 3n];
    const resArr = [1n, 4n, 9n];

    assert.deepEqual(resArr, await payments.read.squareArrayMemo([arr]));
  });

  it("Should square the elements of the array using calldata", async function () {
    const payments = await viem.deployContract("Payments");
    const arr = [1n, 2n, 3n];
    const resArr = [1n, 4n, 9n];

    assert.deepEqual(resArr, await payments.read.squareArrayCall([arr]));
  });

  it("Should set a amount for payment using storage", async function () {
    const payments = await viem.deployContract("Payments");
    const _amount = 10n;

    const Payment0 = await payments.read.getPayments([0]);

    await payments.write.setAmountStor([0, _amount]);

    const newPayment = await payments.read.getPayments([0]);

    assert.notEqual(Payment0.amount, newPayment.amount);
  });
});
